import type { Role } from '@prisma/client';

export class RegisterUserDto {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  phone: string;
  role: Role = 'STANDARD';
}
