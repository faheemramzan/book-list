﻿import { createReducer, on } from '@ngrx/store';

import { BooksApiActions } from './books.actions';
import { Book } from '../models/books.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (state, { books }) => books)
);
