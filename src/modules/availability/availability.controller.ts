import { Controller } from '../../core/controller.abstract';
import {
  availabilityService,
  AvailabilityService,
} from './availability.service';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: Provider's available time slots
 */
export class AvailabilityController extends Controller {
  constructor(private readonly availabilityService: AvailabilityService) {
    super();
  }
  initRoutes(): void {
    this.router.get('/', this.getAll.bind(this));
  }

  /**
   * @swagger
   * /availability:
   *   get:
   *     summary: Get available time slots for a provider
   *     tags: [Availability]
   *     parameters:
   *       - in: query
   *         name: providerId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: The ID of the service provider (userId)
   *       - in: query
   *         name: dateStr
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *           example: "2025-07-16"
   *         description: Date for which availability is requested (YYYY-MM-DD)
   *     responses:
   *       200:
   *         description: List of available time slots
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 slots:
   *                   type: array
   *                   items:
   *                     type: string
   *                   example: ["09:00", "09:30", "10:00", "10:30"]
   *       400:
   *         description: Invalid request parameters
   */
  async getAll(req: Request, res: Response) {
    return this.availabilityService.getAll(req, res);
  }
}

export const availabilityController = new AvailabilityController(
  availabilityService,
);
