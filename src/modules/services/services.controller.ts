import { servicesService, ServicesService } from './services.service';
import { Controller } from '../../core/controller.abstract';
import { Request, Response } from 'express';
import { CreateServiceDto } from './dto/create-service.dto';
import { UserType } from '../../shared/enum/user-type.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Provider service management
 */
export class ServicesController extends Controller {
  constructor(private readonly servicesService: ServicesService) {
    super();
  }

  initRoutes(): void {
    this.router.post(
      '/',
      authMiddleware([UserType.PROVIDER]),
      ...this.validate(CreateServiceDto, this.createOne),
    );
    this.router.get(
      '/:id',
      authMiddleware([UserType.PROVIDER]),
      this.findOne.bind(this),
    );
  }

  /**
   * @swagger
   * /services:
   *   post:
   *     summary: Create new service
   *     tags: [Services]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateServiceDto'
   *     responses:
   *       201:
   *         description: Service created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 duration:
   *                   type: integer
   *                 price:
   *                   type: integer
   */
  async createOne(req: Request, res: Response) {
    return this.servicesService.createOne(req, res);
  }

  /**
   * @swagger
   * /services/{id}:
   *   get:
   *     summary: Get service by ID
   *     tags: [Services]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Service ID
   *     responses:
   *       200:
   *         description: Service data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 duration:
   *                   type: integer
   *                 price:
   *                   type: integer
   */
  async findOne(req: Request, res: Response) {
    return this.servicesService.findOne(req, res);
  }
}

export const servicesController = new ServicesController(servicesService);
