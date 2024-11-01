import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registor')
  async register(@Body() newUser: User): Promise<User> {
    try {
      return this.authService.register(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('login')
  async login(@Body() UsernameAndPassword: User): Promise<LoginResponse> {
    return this.authService.login(UsernameAndPassword);
  }
}
