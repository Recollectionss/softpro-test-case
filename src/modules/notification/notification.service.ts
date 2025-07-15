import { mailFactory, MailFactory } from './mail.factory';
import { MailDto } from '../../shared/dto/mail.dto';
import { Queue } from 'bullmq';
import { queue } from './queue/queue';
import { LaterMailDto } from '../../shared/dto/later-mail.dto';

export class NotificationService {
  constructor(
    private readonly mailFactory: MailFactory,
    private readonly queue: Queue,
  ) {}

  send(data: MailDto) {
    const mail = this.mailFactory.buildMail(data);
    const mailPlainText = Object.entries(mail)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    console.log(`[INFO] Sending mail: ${mailPlainText}`);
  }

  async sendLater(data: LaterMailDto) {
    await this.queue.add(
      'sendReminder',
      {
        email: data.clientMail,
        serviceName: data.serviceName,
      },
      {
        delay: data.delay,
      },
    );
  }
}

export const notificationService = new NotificationService(mailFactory, queue);
