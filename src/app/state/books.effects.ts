import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GoogleBooksService } from '../services/books.service';
import { catchError, exhaustMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksApiActions } from './books.actions';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private booksService = inject(GoogleBooksService);

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksApiActions.fetchBookList),
      exhaustMap(() => this.booksService.getBooks()
        .pipe(
          map(books => BooksApiActions.retrievedBookList({ books: books })),
          catchError(() => of(BooksApiActions.retrievedBookList({
            books: MOCK_BOOKS
          })))
        )
      )
    );
  });
}

export const MOCK_BOOKS = [
  { id: '1', volumeInfo: { title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'] } },
  { id: '2', volumeInfo: { title: '1984', authors: ['George Orwell'] } },
  { id: '3', volumeInfo: { title: 'To Kill a Mockingbird', authors: ['Harper Lee'] } }
];
