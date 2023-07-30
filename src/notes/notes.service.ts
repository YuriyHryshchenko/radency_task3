import { Injectable } from '@nestjs/common';
import { mockedData, Note, NewNote, archivedData } from '../mockedData';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NoteService {
  private notes: Note[] = mockedData;
  private archivedNotes: Note[] = archivedData;

  getNotes() {
    return this.notes;
  }

  getNoteById(id: string) {
    const noteIndex = this.notes.findIndex((item) => item.id === id);
    return this.notes[noteIndex];
  }

  createNote(note: NewNote) {
    const timeOfCreation = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const newNote = {
      id: uuidv4(),
      timeOfCreation,
      ...note,
      date: [note.date],
    };
    this.notes.push(newNote);
  }

  updateNote(id: string, newNote: NewNote) {
    const noteIndex = this.notes.findIndex((item) => item.id === id);
    const note = {
      ...this.notes[noteIndex],
      ...newNote,
      date: [...this.notes[noteIndex].date, newNote.date],
    };
    this.notes.splice(noteIndex, 1, note);
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((item) => item.id === id);
    this.notes.splice(noteIndex, 1);
  }

  archiveNote(id: string) {
    const noteIndex = this.notes.findIndex((item) => item.id === id);
    this.archivedNotes.push(this.notes[noteIndex]);
    this.notes.splice(noteIndex, 1);
  }

  unarchiveNote(id: string) {
    const noteIndex = this.archivedNotes.findIndex((item) => item.id === id);
    this.notes.push(this.archivedNotes[noteIndex]);
    this.archivedNotes.splice(noteIndex, 1);
  }

  getStats() {
    const categoriesActive = new Map<string, number>();
    const categoriesArchived = new Map<string, number>();

    this.notes.forEach((note) => {
      const categoryCount = categoriesActive.get(note.category) || 0;
      categoriesActive.set(note.category, categoryCount + 1);
    });
    const sumActive = Object.fromEntries(categoriesActive);

    this.archivedNotes.forEach((note) => {
      const categoryCount = categoriesArchived.get(note.category) || 0;
      categoriesArchived.set(note.category, categoryCount + 1);
    });
    const sumArchived = Object.fromEntries(categoriesArchived);
    return {
      sumActive,
      sumArchived,
    };
  }

  getArchivedNotes() {
    return this.archivedNotes;
  }
}
