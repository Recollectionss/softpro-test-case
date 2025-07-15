import { Router } from 'express';
import { authController } from './modules/auth/auth.controller';
import { servicesController } from './modules/services/services.controller';
import { bookingController } from './modules/booking/booking.controller';
import { availabilityController } from './modules/availability/availability.controller';
const router = Router();

router.use('/auth', authController.getRouter());
router.use('/services', servicesController.getRouter());
router.use('/booking', bookingController.getRouter());
router.use('/availability', availabilityController.getRouter());

export default router;
