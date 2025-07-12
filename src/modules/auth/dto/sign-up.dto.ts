import { SignInDto } from './sign-in.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../../../shared/enum/user-type.enum';

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: string;
}
