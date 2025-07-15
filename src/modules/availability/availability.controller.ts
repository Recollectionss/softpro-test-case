import { Controller } from '../../core/controller.abstract';
import {
  availabilityService,
  AvailabilityService,
} from './availability.service';
import { Request, Response } from 'express';

export class AvailabilityController extends Controller {
  constructor(private readonly availabilityService: AvailabilityService) {
    super();
  }
  initRoutes(): void {
    this.router.get('/', this.getAll.bind(this));
  }

  async getAll(req: Request, res: Response) {
    return this.availabilityService.getAll(req, res);
  }
}

export const availabilityController = new AvailabilityController(
  availabilityService,
);
