import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { UserTest } from 'src/user-test/user-test.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registor')
  async register(@Body() newUser: UserTest): Promise<UserTest> {
    try {
      return this.authService.register(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('login')
  async login(@Body() UsernameAndPassword: UserTest): Promise<LoginResponse> {
    return this.authService.login(UsernameAndPassword);
  }
}
