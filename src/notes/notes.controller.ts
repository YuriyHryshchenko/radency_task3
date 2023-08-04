import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { noteSchema } from 'src/helpers/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Get('stats')
  getStats() {
    return this.noteService.getStats();
  }


  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Get(':id')
  getNoteById(@Param('id') id: number) {
    return this.noteService.getNoteById(id);
  }

  @Post()
  async createNote(@Body() note: CreateNoteDto) {
    await noteSchema.validate(note);
    return this.noteService.createNote(note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: number) {
    return this.noteService.deleteNoteById(id);
  }

  @Patch(':id')
  async updateNote(@Param('id') id: number, @Body() note: CreateNoteDto) {
    await noteSchema.validate(note);
    return this.noteService.updateNoteById(id, note);
  }

}
