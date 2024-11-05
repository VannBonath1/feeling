import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { Request } from 'express';
import { CreateNoteDto } from './dto/create-note.dto';

export interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('note')
@UseGuards(AuthGuard('jwt')) // Protect all routes with JWT authentication
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(
    @Req() req: AuthenticatedRequest,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const user = req.user; // Get the authenticated user from the request
    return await this.noteService.createNote(user, createNoteDto);
  }
}
