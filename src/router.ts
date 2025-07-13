import { Router } from 'express';
import { authController } from './modules/auth/auth.controller';
import { servicesController } from './modules/services/services.controller';
const router = Router();

router.use('/auth', authController.getRouter());
router.use('/services', servicesController.getRouter());

export default router;
