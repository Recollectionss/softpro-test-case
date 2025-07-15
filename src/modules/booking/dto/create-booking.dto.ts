import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @IsNotEmpty()
  @IsUUID()
  serviceId: string;
}
