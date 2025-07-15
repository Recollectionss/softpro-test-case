import { Controller } from '../../core/controller.abstract';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';
import { authService, AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */
export class AuthController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  initRoutes(): void {
    this.router.post('/sign-in', ...this.validate(SignInDto, this.signIn));
    this.router.post('/sign-up', ...this.validate(SignUpDto, this.signUp));
    this.router.post('/logout', this.logout.bind(this));
    this.router.post('/refresh', this.refresh.bind(this));
  }

  /**
   * @swagger
   * /sign-in:
   *   post:
   *     summary: Login user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SignInDto'
   *     responses:
   *       200:
   *         description: Logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   */
  async signIn(request: Request, response: Response) {
    return this.authService.signIn(request, response);
  }

  /**
   * @swagger
   * /sign-up:
   *   post:
   *     summary: Register new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SignUpDto'
   *     responses:
   *       200:
   *         description: Successfully signed up
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   */
  async signUp(request: Request, response: Response) {
    return this.authService.signUp(request, response);
  }

  /**
   * @swagger
   * /logout:
   *   post:
   *     summary: Logout user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Logged out successfully
   */
  async logout(request: Request, response: Response) {
    return this.authService.logout(request, response);
  }

  /**
   * @swagger
   * /refresh:
   *   post:
   *     summary: Refresh JWT tokens
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Returns new access token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   */
  async refresh(request: Request, response: Response) {
    return this.authService.refresh(request, response);
  }
}

export const authController = new AuthController(authService);
