import { servicesService, ServicesService } from './services.service';
import { Controller } from '../../core/controller.abstract';
import { Request, Response } from 'express';
import { CreateServiceDto } from './dto/create-service.dto';
import { authMiddleware } from '../../middlewares/role.middleware';
import { UserType } from '../../shared/enum/user-type.enum';

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

  async createOne(req: Request, res: Response) {
    return this.servicesService.createOne(req, res);
  }

  async findOne(req: Request, res: Response) {
    return this.servicesService.findOne(req, res);
  }
}

export const servicesController = new ServicesController(servicesService);
