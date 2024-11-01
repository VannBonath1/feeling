import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() createUserDto: User): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('')
  async findUserByName(@Body('username') username: string): Promise<User> {
    return this.userService.findByUserName(username);
  }
}
