import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async createNote(user: User, newNote: Note): Promise<Note> {
    try {
      const note = this.noteRepository.create({
        ...newNote,
        user, // Associate the note with the user
      });
      return note;
    } catch (error) {
      console.log('Oof the old you catch an unexpected error :' + error);
    }
  }
}
