import { BookingMailType } from '../../modules/notification/mail.builder';

export class MailDto {
  providerMail?: string;
  clientMail: string;
  serviceName: string;
  mailType: BookingMailType;
}