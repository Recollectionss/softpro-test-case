import { Request, Response } from 'express';
import { bookingService, BookingService } from '../booking/booking.service';
import { getRedisClient } from '../redis/redis.provider';
import { HttpCode } from '../../shared/enum/http-code.enum';

export class AvailabilityService {
  constructor(private readonly bookingService: BookingService) {}

  async getAll(req: Request, res: Response): Promise<any> {
    const { providerId, dateStr } = req.query;
    const date = new Date(dateStr as string);
    const redis = getRedisClient();
    const cacheKey = `availability:${providerId}:${date.toISOString().slice(0, 10)}`;
    const raw = await redis.get(cacheKey);
    const cached = raw?.toString?.();

    if (cached) {
      return res.status(HttpCode.OK).json(JSON.parse(cached));
    }
    const slots = await this.bookingService.getFreeTime(
      providerId as string,
      date,
    );
    await redis.set(cacheKey, JSON.stringify({ slots }), { EX: 60 });
    return res.status(HttpCode.OK).send({ slots });
  }
}

export const availabilityService = new AvailabilityService(bookingService);
