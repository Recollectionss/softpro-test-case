import { UserType } from '../enum/user-type.enum';

export class UserDto {
  id: string;
  email: string;
  password: string;
  userType: UserType;
}