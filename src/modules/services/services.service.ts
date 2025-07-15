import { Services } from './services.entity';
import { Request, Response } from 'express';
import { CreateServiceDto } from './dto/create-service.dto';
import { HttpCode } from '../../shared/enum/http-code.enum';
import { HttpError } from '../../error/http-error';
import { AccessJwtDataDto } from '../../shared/dto/access-jwt-data.dto';

export class ServicesService {
  constructor(private readonly servicesRepository: typeof Services) {}

  async createOne(req: Request, res: Response) {
    const data = req.body as CreateServiceDto;
    const userData = (req as any).user as AccessJwtDataDto;
    const serviceData = (
      await this.servicesRepository.create({ ...data, userId: userData.sub })
    ).dataValues;
    return res.status(HttpCode.OK).json({ serviceData });
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.servicesRepository.findByPk(id);
    return res.status(HttpCode.OK).json(data.dataValues);
  }

  async findById(id: string) {
    const data = await this.servicesRepository.findByPk(id);

    if (!data) throw new HttpError(HttpCode.NOT_FOUND, 'User not found');
    return data;
  }
}

export const servicesService = new ServicesService(Services);
