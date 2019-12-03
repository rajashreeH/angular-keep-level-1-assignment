import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note;
  noteList: Array<Note> = [];

  constructor(private notesService: NotesService) {
    this.note = new Note;

  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      this.noteList = data;
    },
      err => {
        this.errMessage = err.message;
      });
  }

  add() {

    if (this.note.title && this.note.text) {
      this.noteList.push(this.note);
      console.log(this.noteList);
      this.notesService.addNote(this.note).subscribe(data => { // console.log(data);
      },
        err => {
          this.noteList.pop();
          this.errMessage = err.message;
        });
      this.note = new Note;
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }

  }

}
