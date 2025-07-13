import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
