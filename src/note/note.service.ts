import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from 'src/user/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UserNotFoundException } from 'src/user/exceptions/User-not-found.exception';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNote(
    authUser: User,
    createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    try {
      //get User information if user not found do this
      const user = await this.userRepository.findOne({
        where: { id: authUser.id },
      });
      console.log(user);
      if (!user) {
        throw new UserNotFoundException();
      }

      const note = this.noteRepository.create({
        ...createNoteDto,
        user,
      });

      return await this.noteRepository.save(note);
    } catch (error) {
      console.log('Error creating note:', error);
      throw error; // Rethrow error for further handling
    }
  }
}
