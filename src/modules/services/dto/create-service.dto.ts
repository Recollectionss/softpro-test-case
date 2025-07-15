import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateServiceDto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - duration
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           minLength: 5
 *           maxLength: 50
 *           example: "Haircut"
 *         description:
 *           type: string
 *           minLength: 5
 *           example: "Professional haircut for men and women"
 *         duration:
 *           type: integer
 *           example: 60
 *         price:
 *           type: integer
 *           example: 500
 */
export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  duration: number;

  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  price: number;
}
