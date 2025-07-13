import { Controller } from '../../core/controller.abstract';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';
import { authService, AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

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

  async signIn(request: Request, response: Response) {
    return this.authService.signIn(request, response);
  }

  async signUp(request: Request, response: Response) {
    return this.authService.signUp(request, response);
  }

  async logout(request: Request, response: Response) {
    return this.authService.logout(request, response);
  }

  async refresh(request: Request, response: Response) {
    return this.authService.refresh(request, response);
  }
}

export const authController = new AuthController(authService);
