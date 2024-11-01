import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExistsException } from './exceptions/user-exists.exception';
import { UserNotFoundException } from './exceptions/User-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: Partial<User>): Promise<User> {
    try {
      // check if username already exist
      const existsingUser = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (existsingUser) {
        throw new UserExistsException();
      }

      // if username not exist create account
      const newUser = this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async findByUserName(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        throw new UserNotFoundException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
