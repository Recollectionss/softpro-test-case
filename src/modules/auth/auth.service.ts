import { UserService, userService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { bcryptService, BcryptService } from './bcrypt/bcrypt.service';
import { jwtService, JwtService } from './jwt/jwt.service';
import { JwtTokens } from '../../shared/dto/jwt-tokens.dto';
import { Request, Response } from 'express';
import { Config } from '../../config/config';

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
    res.cookie('token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Config.jwt.tll.refreshToken,
    });
    return res.status(200).json({ accessToken: tokens.accessToken });
  }
}

export const authService = new AuthService(
  userService,
  bcryptService,
  jwtService,
);
