import { Booking } from './booking.entity';

export class BookingService {
  constructor(private readonly bookingRepository: typeof Booking) {}

  async create(req: Request, res: Response): Promise<void> {}

  async findOne(req: Request, res: Response): Promise<void> {}

  async findAll(req: Request, res: Response): Promise<void> {}

  async acceptBooking(req: Request, res: Response): Promise<void> {}

  async cancelBooking(req: Request, res: Response): Promise<void> {}
}

export const bookingService = new BookingService(Booking);
