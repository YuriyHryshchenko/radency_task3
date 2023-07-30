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
import { NewNote } from 'src/mockedData';
import { noteSchema } from 'src/helpers/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Get('stats')
  getStats() {
    return this.noteService.getStats();
  }

  @Get('archived')
  getArchivedNotes() {
    return this.noteService.getArchivedNotes();
  }

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Get(':id')
  getNoteById(@Param('id') id: string) {
    return this.noteService.getNoteById(id);
  }

  @Post()
  async createNote(@Body() note: NewNote) {
    await noteSchema.validate(note);
    this.noteService.createNote(note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    this.noteService.deleteNote(id);
  }

  @Patch(':id')
  async updateNote(@Param('id') id: string, @Body() note: NewNote) {
    await noteSchema.validate(note);
    this.noteService.updateNote(id, note);
  }

  @Patch(':id/archive')
  archiveNote(@Param('id') id: string) {
    this.noteService.archiveNote(id);
  }

  @Patch(':id/unarchive')
  unarchiveNote(@Param('id') id: string) {
    this.noteService.unarchiveNote(id);
  }
}
