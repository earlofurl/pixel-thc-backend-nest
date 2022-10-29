import type { User as PrismaUser } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare, hash } from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // private users: User[] = [
  //   {
  //     id: uuidv4(),
  //     username: 'testDude420',
  //     firstName: 'Joe',
  //     lastName: 'Foo',
  //     email: 'joefoo@test.com',
  //     // Passw0rd!
  //     password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
  //     role: 'ADMIN',
  //   },
  //   {
  //     id: uuidv4(),
  //     username: 'testGrl69',
  //     firstName: 'Jen',
  //     lastName: 'Bar',
  //     email: 'jenbar@test.com',
  //     // P4ssword!
  //     password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
  //     role: 'STANDARD',
  //   },
  // ];

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