import { Services } from './services.entity';
import { Request, Response } from 'express';
import { CreateServiceDto } from './dto/create-service.dto';
import { HttpCode } from '../../shared/enum/http-code.enum';

export class ServicesService {
  constructor(private readonly servicesRepository: typeof Services) {}

  async createOne(req: Request, res: Response) {
    const data = req.body as CreateServiceDto;
    await this.servicesRepository.create(data);
    return res.status(HttpCode.OK).json();
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.servicesRepository.findByPk(id);
    return res.status(HttpCode.OK).json(data.dataValues);
  }
}

export const servicesService = new ServicesService(Services);
