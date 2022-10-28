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

  private users: User[] = [
    {
      id: uuidv4(),
      username: 'testDude420',
      first_name: 'Joe',
      last_name: 'Foo',
      email: 'joefoo@test.com',
      // Passw0rd!
      password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
      role: 'ADMIN',
    },
    {
      id: uuidv4(),
      username: 'testGrl69',
      first_name: 'Jen',
      last_name: 'Bar',
      email: 'jenbar@test.com',
      // P4ssword!
      password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
      role: 'STANDARD',
    },
  ];

  async validateUser(user: LoginUserDto) {
    const foundUser = this.users.find((u) => u.email === user.email);
    if (!user || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password: _password, ...retUser } = foundUser;
    return retUser;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User email must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }
    const { confirmationPassword: _, ...newUser } = user;
    this.users.push({
      ...newUser,
      password: await hash(user.password, 12),
      id: uuidv4(),
    });
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
  }

  findById(id: string): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find((u) => u.id === id);
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }
}
