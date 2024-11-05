import { Module } from '@nestjs/common';
import { NoteTestService } from './note-test.service';
import { NoteTestController } from './note-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteTest } from './note-test.entity';
import { UserTestModule } from 'src/user-test/user-test.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteTest]),
    UserTestModule, // This enables your module to access and utilize the database operations related to the User entity through dependency injection
  ],
  providers: [NoteTestService],
  controllers: [NoteTestController],
  exports: [NoteTestService], // Export UserService for use in other modulesd
})
export class NoteTestModule {}
