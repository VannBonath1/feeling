import { Module } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestController } from './user-test.controller';
import { UserTest } from './user-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTest])],
  providers: [UserTestService],
  controllers: [UserTestController],
  exports: [UserTestService, TypeOrmModule], // Export UserService for use in other modules
})
export class UserTestModule {}
