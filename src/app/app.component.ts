import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';
import { Observable } from 'rxjs';
import { Book } from './models/books.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books$: Observable<readonly Book[]> = new Observable();
  bookCollection$: Observable<Book[]> = new Observable();

  constructor(private store: Store) {
    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);
  }

  ngOnInit() {
    this.store.dispatch(BooksApiActions.fetchBookList());
  }

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}
