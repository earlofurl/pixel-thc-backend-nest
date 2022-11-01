import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

// TODO: Make sure that sessions are invalidated properly when expired

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginUserDto) {
    console.log('loginUser', req.user);
    console.log('loginSession', req.session);
    return req.session;
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findById(id);
  }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
