import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     SignInDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 20
 */

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
