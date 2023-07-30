import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';
import { NoteService } from './notes/notes.service';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [NoteService],
})
export class AppModule {}
