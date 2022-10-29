import type { Role } from '@prisma/client';

export class RegisterUserDto {
  id: string;
  providerId?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmationPassword: string;
  phone?: string;
  role: Role = 'STANDARD';
}
