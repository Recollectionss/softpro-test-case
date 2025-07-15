import jwt from 'jsonwebtoken';
import { Config } from '../../../config/config';
import { UserJwtDataDto } from '../../../shared/dto/user-jwt-data.dto';
import { JwtTokens } from '../../../shared/dto/jwt-tokens.dto';
import { AccessJwtDataDto } from '../../../shared/dto/access-jwt-data.dto';

export class JwtService {
  signTokens(payload: AccessJwtDataDto): JwtTokens {
    return {
      refreshToken: this.signRefreshToken({
        sub: payload.sub,
        userType: payload.userType,
      }),
      accessToken: this.signAccessToken(payload),
    };
  }

  signAccessToken(payload: AccessJwtDataDto): string {
    return jwt.sign({ ...payload, iss: Config.jwt.iss }, Config.jwt.secret, {
      expiresIn: Config.jwt.tll.accessToken,
    });
  }

  signRefreshToken(payload: UserJwtDataDto): string {
    return jwt.sign({ ...payload, iss: Config.jwt.iss }, Config.jwt.secret, {
      expiresIn: Config.jwt.tll.refreshToken,
    });
  }

  verify(token: string): UserJwtDataDto | AccessJwtDataDto {
    return jwt.verify(token, Config.jwt.secret) as UserJwtDataDto;
  }

  decode(token: string): null | UserJwtDataDto | AccessJwtDataDto {
    return jwt.decode(token) as UserJwtDataDto | null;
  }
}

export const jwtService = new JwtService();
