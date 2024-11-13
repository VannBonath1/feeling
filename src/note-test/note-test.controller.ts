import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NoteTestService } from './note-test.service';
import { CreateNoteTestDto } from './dto/create-note-test.dto';
import { NoteTest } from './note-test.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from './type/note-test.type';

@Controller('note-test')
export class NoteTestController {
  constructor(private readonly noteTestService: NoteTestService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt')) // Protect all routes with JWT authentication
  async createNoteTest(
    @Req() req: AuthenticatedRequest,
    @Body() createNoteTest: CreateNoteTestDto,
  ): Promise<NoteTest> {
    const user = req.user; // Get the authenticated user from the request
    const { userTestAuthId } = user;
    return await this.noteTestService.createNoteTest(
      userTestAuthId,
      createNoteTest,
    );
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteNoteTest(
    @Req() req: AuthenticatedRequest,
    @Body() noteTest: NoteTest,
  ): Promise<{ message: string }> {
    const userTestAuth = req.user;
    await this.noteTestService.deleteNoteTest(userTestAuth, noteTest);
    return { message: 'Deleted' };
  }

  @Get('')
  async getAllNoteTest(): Promise<NoteTest[]> {
    return await this.noteTestService.getAllNoteTest();
  }
}
