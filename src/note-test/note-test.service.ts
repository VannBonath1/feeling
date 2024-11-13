import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteTest } from './note-test.entity';
import { CreateNoteTestDto } from './dto/create-note-test.dto';
import { UserTest } from 'src/user-test/user-test.entity';
import { UserNotFoundException } from 'src/user/exceptions/User-not-found.exception';
import { UserTestAuth } from './type/note-test.type';

@Injectable()
export class NoteTestService {
  constructor(
    @InjectRepository(NoteTest)
    private readonly noteTestRepository: Repository<NoteTest>,
    @InjectRepository(UserTest)
    private readonly userTestRepository: Repository<UserTest>,
  ) {}

  async createNoteTest(
    userTestAuthId: number,
    createNoteTestDto: CreateNoteTestDto,
  ): Promise<NoteTest> {
    try {
      //get User information if user not found do this
      const userTest = await this.userTestRepository.findOne({
        where: { id: userTestAuthId },
      });
      console.log(userTest);
      if (!userTest) {
        throw new UserNotFoundException();
      }

      // if user found create note test
      const newNote = this.noteTestRepository.create({
        ...createNoteTestDto,
        userTest,
      });
      return await this.noteTestRepository.save(newNote);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteNoteTest(
    userTestAuth: UserTestAuth,
    noteTest: NoteTest,
  ): Promise<void> {
    try {
      // Verify ownership of the note
      const noteOwner = await this.noteTestRepository.findOne({
        where: {
          id: noteTest.id,
          userTest: { id: userTestAuth.userTestAuthId },
        },
        relations: ['userTest'],
      });

      await this.noteTestRepository.delete(noteTest);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllNoteTest(): Promise<NoteTest[]> {
    try {
      return await this.noteTestRepository.find({ relations: ['userTest'] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
