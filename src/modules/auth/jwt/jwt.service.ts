import jwt from 'jsonwebtoken';
import { Config } from '../../../config/config';
import { UserJwtDataDto } from '../../../shared/dto/user-jwt-data.dto';
import { JwtTokens } from '../../../shared/dto/jwt-tokens.dto';

export class JwtService {
  signTokens(payload: UserJwtDataDto): JwtTokens {
    return {
      refreshToken: this.signRefreshToken(payload),
      accessToken: this.signAccessToken(payload),
    };
  }

  signAccessToken(payload: UserJwtDataDto): string {
    return jwt.sign({ ...payload, iss: Config.jwt.iss }, Config.jwt.secret, {
      expiresIn: Config.jwt.tll.accessToken,
    });
  }

  signRefreshToken(payload: UserJwtDataDto): string {
    return jwt.sign({ ...payload, iss: Config.jwt.iss }, Config.jwt.secret, {
      expiresIn: Config.jwt.tll.refreshToken,
    });
  }

  verify(token: string): UserJwtDataDto {
    return jwt.verify(token, Config.jwt.secret) as UserJwtDataDto;
  }

  decode(token: string): null | UserJwtDataDto {
    return jwt.decode(token) as UserJwtDataDto | null;
  }
}

export const jwtService = new JwtService();
