import { Booking } from './booking.entity';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserJwtDataDto } from '../../shared/dto/user-jwt-data.dto';
import { HttpCode } from '../../shared/enum/http-code.enum';
import { servicesService, ServicesService } from '../services/services.service';
import { HttpError } from '../../error/http-error';
import { Op } from 'sequelize';
import { Services } from '../services/services.entity';
import {
  notificationService,
  NotificationService,
} from '../notification/notification.service';
import { AccessJwtDataDto } from '../../shared/dto/access-jwt-data.dto';
import { userService, UserService } from '../user/user.service';
import { BookingMailType } from '../../shared/enum/booking-mail.enum';

export class BookingService {
  constructor(
    private readonly bookingRepository: typeof Booking,
    private readonly servicesService: ServicesService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const data: CreateBookingDto = req.body;
    const userData: AccessJwtDataDto = (req as any).user;

    const serviceData = await this.servicesService.findById(data.serviceId);
    const providerData = await this.userService.findById(serviceData.userId);

    await this.checkCreate(data);
    await this.bookingRepository.create({ ...data, userId: userData.sub });

    this.notificationService.send({
      clientMail: userData.email,
      serviceName: serviceData.name,
      providerMail: providerData.email,
      mailType: BookingMailType.CREATED,
    });
    return res.status(HttpCode.CREATED).json({});
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dataValues = await this.bookingRepository.findByPk(id);

    if (!dataValues) {
      throw new HttpError(HttpCode.NOT_FOUND, 'Booking not found');
    }

    return res.status(HttpCode.OK).json({ dataValues });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const userData: UserJwtDataDto = (req as any).user;
    const data = await this.bookingRepository.findAll({
      include: [
        {
          model: Services,
          where: { userId: userData.sub },
        },
      ],
    });
    return res.status(HttpCode.OK).json({ data });
  }

  async acceptBooking(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.changeBookingStatus(id, true);
    return res.status(HttpCode.OK).json({});
  }

  async cancelBooking(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.changeBookingStatus(id, false);
    return res.status(HttpCode.OK).json({});
  }

  private async checkCreate(data: CreateBookingDto): Promise<void | HttpError> {
    const serviceData = await this.servicesService.findById(data.serviceId);
    const endTime: Date = new Date(data.startTime.getTime());
    endTime.setMinutes(data.startTime.getMinutes() + serviceData.duration);
    const bookings = await Booking.findAll({
      where: {
        serviceId: serviceData.id,
        startTime: {
          [Op.lt]: endTime,
        },
      },
    });

    for (const booking of bookings) {
      const existingStart = new Date(booking.startTime);
      const existingEnd = new Date(existingStart.getTime());
      existingEnd.setMinutes(existingEnd.getMinutes() + serviceData.duration);

      const overlaps = existingStart < endTime && existingEnd > data.startTime;

      if (overlaps) {
        throw new HttpError(HttpCode.CONFLICT, 'Time slot already taken');
      }
    }
  }

  private async changeBookingStatus(
    id: string,
    accepted: boolean,
  ): Promise<void> {
    const bookingData = await this.bookingRepository.findByPk(id);
    bookingData.accepted = accepted;
    await bookingData.save();

    const serviceName = (
      await this.servicesService.findById(bookingData.serviceId)
    ).name;
    const clientEmail = (await this.userService.findById(bookingData.userId))
      .email;

    this.notificationService.send({
      mailType: BookingMailType.CANCEL,
      clientMail: clientEmail,
      serviceName,
    });
  }
}

export const bookingService = new BookingService(
  Booking,
  servicesService,
  notificationService,
  userService,
);
