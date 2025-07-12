import { Router } from 'express';
import { AuthController } from './modules/auth/auth.controller';
const router = Router();

const authController = new AuthController();

router.use('/auth', authController.getRouter());

export default router;
