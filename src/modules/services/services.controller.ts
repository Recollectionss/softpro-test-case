import { servicesService, ServicesService } from './services.service';
import { Controller } from '../../core/controller.abstract';
import { Request, Response } from 'express';
import { CreateServiceDto } from './dto/create-service.dto';

export class ServicesController extends Controller {
  constructor(private readonly servicesService: ServicesService) {
    super();
  }

  initRoutes(): void {
    this.router.post('/', ...this.validate(CreateServiceDto, this.createOne));
    this.router.get('/', this.findOne.bind(this));
  }

  async createOne(req: Request, res: Response) {
    return this.servicesService.createOne(req, res);
  }
  async findOne(req: Request, res: Response) {
    return this.servicesService.findOne(req, res);
  }
}

export const servicesController = new ServicesController(servicesService);
