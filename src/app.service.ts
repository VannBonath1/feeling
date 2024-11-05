import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTest } from './user-test/user-test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(UserTest)
    private readonly UserTestRepository: Repository<UserTest>,
  ) {}

  async createUserTest() {}
}
