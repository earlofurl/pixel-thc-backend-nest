import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { AppService } from './app.service';
import { LoggedInGuard } from './guards/logged-in.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  publicRoute() {
    return this.appService.getPublicMessage();
  }

  @UseGuards(LoggedInGuard)
  @Get('protected')
  guardedRoute() {
    return this.appService.getPrivateMessage();
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage();
  }
}
