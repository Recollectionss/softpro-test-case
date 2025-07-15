import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBookingDto:
 *       type: object
 *       required:
 *         - startTime
 *         - serviceId
 *       properties:
 *         startTime:
 *           type: string
 *           format: date-time
 *           example: "2025-07-16T14:00:00.000Z"
 *         serviceId:
 *           type: string
 *           format: uuid
 *           example: "5e197478-666c-4ee6-9daa-58ff86e901ab"
 */
export class CreateBookingDto {
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @IsNotEmpty()
  @IsUUID()
  serviceId: string;
}
