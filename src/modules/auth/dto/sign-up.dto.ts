import { SignInDto } from './sign-in.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../../../shared/enum/user-type.enum';
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpDto:
 *       allOf:
 *         - $ref: '#/components/schemas/SignInDto'
 *         - type: object
 *           required:
 *             - userType
 *           properties:
 *             userType:
 *               type: string
 *               enum: [client, provider]
 */

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;
}
