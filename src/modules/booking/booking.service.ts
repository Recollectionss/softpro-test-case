import { Booking } from './booking.entity';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserJwtDataDto } from '../../shared/dto/user-jwt-data.dto';
import { HttpCode } from '../../shared/enum/http-code.enum';
import { servicesService, ServicesService } from '../services/services.service';
import { HttpError } from '../../shared/error/http-error';
import { Op } from 'sequelize';
import { Services } from '../services/services.entity';

export class BookingService {
  constructor(
    private readonly bookingRepository: typeof Booking,
    private readonly servicesService: ServicesService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const data: CreateBookingDto = req.body;
    const userData: UserJwtDataDto = (req as any).user;
    await this.checkCreate(data);
    await this.bookingRepository.create({ ...data, userId: userData.sub });
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
    await this.bookingRepository.update({ accepted: true }, { where: { id } });
    return res.status(HttpCode.OK).json({});
  }

  async cancelBooking(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.bookingRepository.update({ accepted: false }, { where: { id } });
    return res.status(HttpCode.OK).json({});
  }

  private async checkCreate(data: CreateBookingDto): Promise<void | HttpError> {
    const serviceData = await this.servicesService.findById(data.serviceId);
    const endTime: Date = new Date(data.startTime.getTime());
    endTime.setMinutes(data.startTime.getMinutes() + serviceData.duration);
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

      const overlaps = existingStart < endTime && existingEnd > data.startTime;

      if (overlaps) {
        throw new HttpError(HttpCode.CONFLICT, 'Time slot already taken');
      }
    }
  }
}

export const bookingService = new BookingService(Booking, servicesService);
