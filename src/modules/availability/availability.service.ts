import { Request, Response } from 'express';
import { bookingService, BookingService } from '../booking/booking.service';

export class AvailabilityService {
  constructor(private readonly bookingService: BookingService) {}

  async getAll(req: Request, res: Response): Promise<any> {
    const { providerId, date } = req.query;
    const slots = await this.bookingService.getFreeTime(
      providerId as string,
      new Date(date as string),
    );
    return res.status(200).send({ slots });
  }
}

export const availabilityService = new AvailabilityService(bookingService);