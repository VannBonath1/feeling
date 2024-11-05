import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTest } from './user-test.entity';
import { Repository } from 'typeorm';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UserExistsException } from 'src/user/exceptions/user-exists.exception';

@Injectable()
export class UserTestService {
  constructor(
    @InjectRepository(UserTest)
    private readonly userTestRepository: Repository<UserTest>,
  ) {}

  async createUserTest(
    createUserTestDto: CreateUserTestDto,
  ): Promise<UserTest> {
    try {
      // if user doesnt exist
      const existUser = await this.userTestRepository.findOne({
        where: { name: createUserTestDto.name },
      });
      if (existUser) {
        throw new UserExistsException();
      }

      //if user exist
      const newUser = this.userTestRepository.create(createUserTestDto);
      return await this.userTestRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
