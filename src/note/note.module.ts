import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]), // This enables your module to access and utilize the database operations related to the User entity through dependency injection
  ],
  providers: [NoteService],
  controllers: [NoteController],
  exports: [NoteService], // Export UserService for use in other modulesd
})
export class NoteModule {}
