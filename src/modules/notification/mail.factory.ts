import { MailDto } from '../../shared/dto/mail.dto';
import { BookingMailType } from '../../shared/enum/booking-mail.enum';
import { FakeMailDto } from '../../shared/dto/fake-mail.dto';

export class MailFactory {
  buildMail(data: MailDto): FakeMailDto {
    const mail: FakeMailDto = {
      to: '',
      subject: '',
      text: '',
    };
    switch (data.mailType) {
      case BookingMailType.CREATED:
        mail.to = data.providerMail;
        mail.subject = 'Create booking';
        mail.text = `User ${data.clientMail} created booking on service ${data.serviceName}`;
        return mail;
      case BookingMailType.ACCEPT:
        mail.to = data.clientMail;
        mail.subject = 'Booking accepted';
        mail.text = `Your booking on service ${data.serviceName}, has been accepted.`;
        return mail;
      case BookingMailType.CANCEL:
        mail.to = data.clientMail;
        mail.subject = 'Canceling booking';
        mail.text = `Your booking on service ${data.serviceName}, has been cancelled.`;
        return mail;
    }
  }
}

export const mailFactory = new MailFactory();
