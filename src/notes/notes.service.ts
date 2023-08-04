import { Injectable } from "@nestjs/common";
import { Note } from "./notes.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateNoteDto } from "./dto/create-note.dto";

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}

  async createNote(note: CreateNoteDto) {
    const timeOfCreation = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const noteObj = {
      timeOfCreation,
      ...note
    }
    const newNote = await this.noteRepository.create(noteObj);
    return newNote;

  }

  async getNotes(){
    const notes = await this.noteRepository.findAll();
    return notes;
  }

  async getNoteById(id: number) {
    const note = await this.noteRepository.findByPk(id);
    return note;
  }

  async deleteNoteById(id: number){
      const deletedNote = await this.noteRepository.destroy({where: {id: id}});
      return deletedNote;
  }
  
  async updateNoteById(id: number, note: CreateNoteDto) {
    const updatedNote = await this.noteRepository.update(note, {where: {id: id}});
    return updatedNote;
  }

  async getStats() {
    const categoriesActive = new Map<string, number>();
    const notes = await this.getNotes();

    notes.forEach((note) => {
      const categoryCount = categoriesActive.get(note.category) || 0;
      categoriesActive.set(note.category, categoryCount + 1);
    });
    const sumActive = Object.fromEntries(categoriesActive);
    return sumActive;
  }
}
