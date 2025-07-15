import { Request, Response } from 'express';

export class AvailabilityService {
  async getAll(req: Request, res: Response): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export const availabilityService = new AvailabilityService();