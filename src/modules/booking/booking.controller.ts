import { Controller } from '../../core/controller.abstract';
import { authMiddleware } from '../../middlewares/role.middleware';
import { UserType } from '../../shared/enum/user-type.enum';
import { bookingService, BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request, Response } from 'express';

export class BookingController extends Controller {
  constructor(private readonly bookingService: BookingService) {
    super();
  }
  initRoutes(): void {
    this.router.post(
      '/',
      authMiddleware([UserType.CLIENT]),
      ...this.validate(CreateBookingDto, this.create),
    );
    this.router.get('/:id', this.findOne.bind(this));
    this.router.get('/', this.findAll.bind(this));
    this.router.post(
      '/accept/:id',
      authMiddleware([UserType.PROVIDER]),
      this.acceptBooking.bind(this),
    );
    this.router.post(
      '/cancel/:id',
      authMiddleware([UserType.PROVIDER]),
      this.cancelBooking.bind(this),
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    return this.bookingService.create(req, res);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    return this.bookingService.findOne(req, res);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    return this.bookingService.findAll(req, res);
  }

  async acceptBooking(req: Request, res: Response): Promise<Response> {
    return this.bookingService.acceptBooking(req, res);
  }

  async cancelBooking(req: Request, res: Response): Promise<Response> {
    return this.bookingService.cancelBooking(req, res);
  }
}

export const bookingController = new BookingController(bookingService);
