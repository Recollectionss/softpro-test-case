import { BookingMailType } from '../enum/booking-mail.enum';

export class MailDto {
  providerMail?: string;
  clientMail: string;
  serviceName: string;
  mailType: BookingMailType;
}
