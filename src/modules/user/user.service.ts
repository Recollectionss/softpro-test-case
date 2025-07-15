import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpError } from '../../error/http-error';
import { HttpCode } from '../../shared/enum/http-code.enum';

export class UserService {
  constructor(private readonly userRepository: typeof User) {}

  async createOne(data: CreateUserDto): Promise<User> {
    await this.validateUser(data.email);
    return (await this.userRepository.create({ ...data, type: data.userType }))
      .dataValues;
  }

  async validateUser(email: string) {
    const dataValues = await this.userRepository.findOne({
      where: { email: email },
    });

    if (dataValues) {
      throw new HttpError(
        HttpCode.CONFLICT,
        `User with this email already exists`,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    const dataValues = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!dataValues) {
      throw new HttpError(HttpCode.NOT_FOUND, 'User not found');
    }
    return dataValues;
  }

  async findById(id: string): Promise<User> {
    const dataValues = await this.userRepository.findByPk(id);

    if (!dataValues) {
      throw new HttpError(HttpCode.INTERNAL_SERVER_ERROR, 'User not found');
    }
    return dataValues;
  }
}

export const userService = new UserService(User);
