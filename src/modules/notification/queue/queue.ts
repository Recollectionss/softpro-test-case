import { notificationService } from '../notification.service';
import { Queue, Worker } from 'bullmq';
import { BookingMailType } from '../../../shared/enum/booking-mail.enum';

export const queue = new Queue('reminderQueue', {
  connection: {
    host: 'redis',
    port: 6379,
  },
});

export const queueWorker = new Worker(
  'reminderQueue',
  async (job) => {
    const { email, serviceName } = job.data;

    notificationService.send({
      clientMail: email,
      serviceName,
      mailType: BookingMailType.REMINDER,
    });

    console.log(`[Worker] Sent reminder to ${email} for ${serviceName}`);
  },
  {
    connection: {
      host: 'redis',
      port: 6379,
    },
  },
);
