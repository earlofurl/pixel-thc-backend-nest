import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPublicMessage(): string {
    return 'This message is public to all!';
  }

  getPrivateMessage(): string {
    return `Success! You're seeing this because you are authenticated`;
  }

  getAdminMessage(): string {
    return `Success! You're seeing this because you are an admin`;
  }
}
