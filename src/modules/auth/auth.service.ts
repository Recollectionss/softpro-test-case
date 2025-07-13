import { UserService, userService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { bcryptService, BcryptService } from './bcrypt/bcrypt.service';
import { jwtService, JwtService } from './jwt/jwt.service';
import { JwtTokens } from '../../shared/dto/jwt-tokens.dto';
import { Request, Response } from 'express';
import { Config } from '../../config/config';
import { HttpError } from '../../shared/error/http-error';
import { HttpCode } from '../../shared/enum/http-code.enum';
import { UserJwtDataDto } from '../../shared/dto/user-jwt-data.dto';
import { JsonWebTokenError } from 'jsonwebtoken';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(req: Request<object, object, SignInDto>, res: Response) {
    const data: SignInDto = req.body;
    await this.userService.validateUser(data.email);

    data.password = await this.bcryptService.setHash(data.password);
    const userData = await this.userService.createOne(data);
    const tokens: JwtTokens = this.jwtService.signTokens({
      sub: userData.id,
      userType: userData.type,
    });

    this.setTokenInCookie(res, tokens.refreshToken);
    return res.status(200).json({ accessToken: tokens.accessToken });
  }

  async signIn(req: Request<object, object, SignInDto>, res: Response) {
    const data: SignInDto = req.body;
    const userData = await this.userService.findByEmail(data.email);

    await this.validatePassword(data.password, userData.password);
    const tokens: JwtTokens = this.jwtService.signTokens({
      sub: userData.id,
      userType: userData.type,
    });

    this.setTokenInCookie(res, tokens.refreshToken);
    return res.status(200).json({ accessToken: tokens.accessToken });
  }

  async refresh(req: Request, res: Response) {
    const token: string = req.cookies['token'];
    let jwtData: UserJwtDataDto;
    try {
      jwtData = this.jwtService.decode(token);
      await this.userService.findById(jwtData.sub);
      const tokens = this.jwtService.signTokens(jwtData);
      this.setTokenInCookie(res, tokens.refreshToken);
      return res.status(200).json({ accessToken: tokens.accessToken });
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new HttpError();
      }
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.status(200).json({});
  }

  private async validatePassword(password: string, hashPassword: string) {
    if (!(await this.bcryptService.compareHash(password, hashPassword))) {
      throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid password');
    }
  }

  private setTokenInCookie(res: Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: Config.jwt.tll.refreshToken,
    });
  }
}

export const authService = new AuthService(
  userService,
  bcryptService,
  jwtService,
);
