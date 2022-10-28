import type { Role } from '@prisma/client';

export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  phone?: string;
  role: Role;
}
