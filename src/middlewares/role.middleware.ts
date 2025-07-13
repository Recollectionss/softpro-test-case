import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../shared/enum/http-code.enum';
import { jwtService } from '../modules/auth/jwt/jwt.service';
import { UserType } from '../shared/enum/user-type.enum';

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

      const payload = jwtService.verify(token);

      if (allowedRoles.length && !allowedRoles.includes(payload.userType)) {
        return res
          .status(HttpCode.FORBIDDEN)
          .json({ message: 'Insufficient role' });
      }

      (req as any).user = payload;

      next();
    } catch (error) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }
  };
}
