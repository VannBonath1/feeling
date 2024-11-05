import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UserTestService } from './user-test.service';

@Controller('user-test')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @Post('')
  async createTestNote(
    @Body() createTestNote: CreateUserTestDto,
  ): Promise<CreateUserTestDto> {
    return await this.userTestService.createUserTest(createTestNote);
  }
}
