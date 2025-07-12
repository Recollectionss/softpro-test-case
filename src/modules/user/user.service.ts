import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserService {
  constructor(private readonly userRepository: typeof User) {}

  async createOne(data: CreateUserDto): Promise<User> {
    await this.validateUser(data.email);
    return (await this.userRepository.create(data)).dataValues;
  }

  async validateUser(email: string) {
    const dataValues = await this.userRepository.findOne({
      where: { email: email },
    });

    if (dataValues) {
      throw new Error(`409 : Employee with this email already exists`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const dataValues = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!dataValues) {
      throw new Error('500: User not found');
    }
    return dataValues;
  }

  async findById(id: string): Promise<User> {
    const dataValues = await this.userRepository.findByPk(id);

    if (!dataValues) {
      throw new Error('404: User not found');
    }
    return dataValues;
  }
}

export const userService = new UserService(User);
