import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

export interface LoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: User): Promise<User> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      // Create a new user
      const user = await this.userService.createUser({
        username: newUser.username,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(UsernameAndPassword: User): Promise<LoginResponse> {
    try {
      //find user by username
      const user = await this.userService.findByUserName(
        UsernameAndPassword.username,
      );
      if (!user) {
        throw new UnauthorizedException();
      }

      // if username exist let check there password if its right or wrong
      const isPasswordValid = await bcrypt.compare(
        UsernameAndPassword.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // if password also correct let Generate a JWT token for them to login
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
