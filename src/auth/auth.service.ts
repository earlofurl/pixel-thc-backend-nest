import { PrismaService } from 'nestjs-prisma';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user.interface';

type SignupResponse = {
  success: boolean;
  message: string;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(
    user: LoginUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    // Check for existing user with email
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    // If user not provided or password doesn't match, throw UnauthorizedException
    if (!user || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    // If user is found, return user without password
    const { password: _password, ...retUser } = foundUser;
    return retUser;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User email must be unique');
    }

    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }

    const { confirmationPassword: _, ...newUser } = user;
    const hashedPassword = await hash(user.password, 12);

    const userRegistration = this.prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword,
        id: uuidv4(),
      },
    });
    // return { success: true, message: 'User registered successfully' };
    return userRegistration;
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    // const { password: _, ...user } = this.users.find((u) => u.id === id);
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }
}
