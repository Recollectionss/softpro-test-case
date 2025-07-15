import { Booking } from './booking.entity';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
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
    await this.bookingRepository.create({
      ...data,
      userId: userData.sub,
      startTime: new Date(data.startTime),
    });

    this.notificationService.send({
      clientMail: userData.email,
      serviceName: serviceData.name,
      providerMail: providerData.email,
      mailType: BookingMailType.CREATED,
    });

    const start = new Date(data.startTime);
    const delay = start.getTime() - Date.now() - 60 * 60 * 1000;

    if (delay > 0) {
      await this.notificationService.sendLater({
        serviceName: serviceData.name,
        mailType: BookingMailType.REMINDER,
        clientMail: userData.email,
        delay,
      });
    }
    return res.status(HttpCode.CREATED).json({});
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dataValues = await this.bookingRepository.findByPk(id);

    if (!dataValues) {
      throw new HttpError(HttpCode.NOT_FOUND, 'Booking not found');
    }

    return res.status(HttpCode.OK).json(dataValues);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const userData: AccessJwtDataDto = (req as any).user;
    const data = await this.bookingRepository.findAll({
      include: [
        {
          model: Services,
          where: { userId: userData.sub },
        },
      ],
    });
    return res.status(HttpCode.OK).json(data);
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

  async getFreeTime(providerId: string, date: Date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const bookings = await this.bookingRepository.findAll({
      include: [
        {
          model: Services,
          where: { userId: providerId },
        },
      ],
      where: {
        startTime: {
          [Op.between]: [dayStart, dayEnd],
        },
        accepted: true,
      },
    });

    const takenSlots: Array<{ from: Date; to: Date }> = bookings.map(
      (booking) => {
        const start = new Date(booking.startTime);
        const duration = booking.service?.duration ?? 0;
        const end = new Date(start.getTime() + duration * 60_000);
        return { from: start, to: end };
      },
    );

    const workStart = new Date(dayStart);
    workStart.setHours(9, 0, 0, 0);
    const workEnd = new Date(dayStart);
    workEnd.setHours(17, 0, 0, 0);

    const slotSizeMinutes = 30;
    const availableSlots: string[] = [];

    for (
      let time = new Date(workStart);
      time < workEnd;
      time = new Date(time.getTime() + slotSizeMinutes * 60_000)
    ) {
      const slotStart = time;
      const slotEnd = new Date(slotStart.getTime() + slotSizeMinutes * 60_000);

      const overlaps = takenSlots.some(
        (slot) => slotStart < slot.to && slotEnd > slot.from,
      );

      if (!overlaps) {
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        availableSlots.push(`${hours}:${minutes}`);
      }
    }

    return availableSlots;
  }

  private async checkCreate(data: CreateBookingDto): Promise<void | HttpError> {
    const serviceData = await this.servicesService.findById(data.serviceId);
    const endTime: Date = new Date(data.startTime);
    endTime.setMinutes(endTime.getMinutes() + serviceData.duration);
    const bookings = await Booking.findAll({
      where: {
        userId: serviceData.userId,
        startTime: {
          [Op.lt]: endTime,
        },
      },
    });

    for (const booking of bookings) {
      const existingStart = new Date(booking.startTime);
      const existingEnd = new Date(existingStart.getTime());
      existingEnd.setMinutes(existingEnd.getMinutes() + serviceData.duration);
      const overlaps =
        existingStart < endTime && existingEnd > new Date(data.startTime);

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
