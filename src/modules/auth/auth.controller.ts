import { Controller } from '../../core/controller.abstract';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';

export class AuthController extends Controller {
  async initRoutes(): Promise<void> {
    this.router.post('/sign-in', ...this.validate(SignUpDto, this.signIn));
    this.router.post('/sign-up', ...this.validate(SignUpDto, this.signUp));
    this.router.post('/logout', this.logout.bind(this));
    this.router.post('/refresh', this.refresh.bind(this));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(request: Request, response: Response) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(request: Request, response: Response) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(request: Request, response: Response) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refresh(request: Request, response: Response) {}
}
