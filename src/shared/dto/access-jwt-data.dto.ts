import { UserJwtDataDto } from './user-jwt-data.dto';

export class AccessJwtDataDto extends UserJwtDataDto {
  email: string;
}
