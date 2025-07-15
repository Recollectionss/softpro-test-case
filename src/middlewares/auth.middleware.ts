import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../shared/enum/http-code.enum';
import { jwtService } from '../modules/auth/jwt/jwt.service';
import { UserType } from '../shared/enum/user-type.enum';
import { AccessJwtDataDto } from '../shared/dto/access-jwt-data.dto';

export function authMiddleware(allowedRoles: UserType[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
          .status(HttpCode.UNAUTHORIZED)
          .json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];

      const payload = jwtService.verify(token) as AccessJwtDataDto;

      if (allowedRoles.length && !allowedRoles.includes(payload.userType)) {
        return res
          .status(HttpCode.FORBIDDEN)
          .json({ message: 'Insufficient role' });
      }

      (req as any).user = payload;

      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }
  };
}
