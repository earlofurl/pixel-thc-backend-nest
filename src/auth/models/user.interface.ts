import type { Role } from '@prisma/client';

export interface User {
  id: string;
  providerId?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  role: Role;
}
