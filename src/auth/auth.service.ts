import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserTest } from 'src/user-test/user-test.entity';
import { UserTestService } from 'src/user-test/user-test.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface LoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userTestService: UserTestService,
    private jwtService: JwtService,
    @InjectRepository(UserTest)
    private readonly userTestRepository: Repository<UserTest>,
  ) {}

  async register(newUser: UserTest): Promise<UserTest> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      // Create a new user
      const userTest = await this.userTestService.createUserTest({
        name: newUser.name,
        password: hashedPassword,
      });

      return userTest;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(UsernameAndPassword: UserTest): Promise<LoginResponse> {
    try {
      //find user by username
      const user = await this.userTestRepository.findOne({
        where: { name: UsernameAndPassword.name },
      });
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
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
