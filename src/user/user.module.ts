import { Module } from '@nestjs/common';
import { UserService } from './user.service'; // Adjust based on your structure
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Adjust based on your structure
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This enables your module to access and utilize the database operations related to the User entity through dependency injection
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService for use in other modulesd
})
export class UserModule {}
