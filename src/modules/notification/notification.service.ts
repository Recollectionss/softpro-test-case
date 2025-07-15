import { mailFactory, MailFactory } from './mail.factory';
import { MailDto } from '../../shared/dto/mail.dto';

export class NotificationService {
  constructor(private readonly mailFactory: MailFactory) {}
  send(data: MailDto) {
    const mail = this.mailFactory.buildMail(data);
    const mailPlainText = Object.entries(mail)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    console.log(`[INFO] Sending mail: ${mailPlainText}`);
  }
}

export const notificationService = new NotificationService(mailFactory);
