import { Controller } from '../../core/controller.abstract';
import { UserType } from '../../shared/enum/user-type.enum';
import { bookingService, BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request, Response } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking operations for clients and providers
 */
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
    this.router.get(
      '/:id',
      authMiddleware([UserType.PROVIDER]),
      this.findOne.bind(this),
    );
    this.router.get(
      '/',
      authMiddleware([UserType.PROVIDER]),
      this.findAll.bind(this),
    );
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

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
  /**
   * @swagger
   * /booking:
   *   post:
   *     summary: Create new booking
   *     tags: [Booking]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBookingDto'
   *     responses:
   *       201:
   *         description: Booking created
   *       409:
   *         description: Time slot already taken
   */
  async create(req: Request, res: Response): Promise<Response> {
    return this.bookingService.create(req, res);
  }

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
  /**
   * @swagger
   * /booking/{id}:
   *   get:
   *     summary: Get booking by ID
   *     tags: [Booking]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Booking ID
   *     responses:
   *       200:
   *         description: Booking found
   *       404:
   *         description: Booking not found
   */
  async findOne(req: Request, res: Response): Promise<Response> {
    return this.bookingService.findOne(req, res);
  }

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
  /**
   * @swagger
   * /booking:
   *   get:
   *     summary: Get all bookings for provider
   *     tags: [Booking]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of bookings
   */
  async findAll(req: Request, res: Response): Promise<Response> {
    return this.bookingService.findAll(req, res);
  }

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
  /**
   * @swagger
   * /booking/accept/{id}:
   *   post:
   *     summary: Accept a booking
   *     tags: [Booking]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Booking ID
   *     responses:
   *       200:
   *         description: Booking accepted
   */
  async acceptBooking(req: Request, res: Response): Promise<Response> {
    return this.bookingService.acceptBooking(req, res);
  }

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
  /**
   * @swagger
   * /booking/cancel/{id}:
   *   post:
   *     summary: Cancel a booking
   *     tags: [Booking]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Booking ID
   *     responses:
   *       200:
   *         description: Booking cancelled
   */
  async cancelBooking(req: Request, res: Response): Promise<Response> {
    return this.bookingService.cancelBooking(req, res);
  }
}

export const bookingController = new BookingController(bookingService);
