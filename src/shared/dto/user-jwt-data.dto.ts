import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../enum/user-type.enum';

export class UserJwtDataDto implements JwtPayload {
  sub: string;
  userType: UserType;
}
