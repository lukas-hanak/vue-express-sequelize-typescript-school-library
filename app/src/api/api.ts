import axios from 'axios';
import {Book} from '@/store/modules/library/libraryInterface';

const api = axios.create({
  baseURL: 'http://localhost:30000',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
  }
});

export async function fetchAllBooks(): Promise<Book[] | null> {
  const response = await api.get('/books');
  if (response.status === 404 || response.status === 500) {
    console.error(response.data);
    return null;
  }
  return response.data;
}

export async function createBook(book: Book): Promise<Book | null> {
  const response = await api.post('/books/create', book);
  if (response.status === 404 || response.status === 500) {
    console.error(response.data);
    return null;
  }
  return response.data;
}

export async function updateBook(book: Book): Promise<Book | null> {
  const response = await api.post('/books/update', book);
  if (response.status === 404 || response.status === 500) {
    console.error(response.data);
    return null;
  }
  console.log(response.data)
  return response.data;
}

export async function removeBook(bookID: number): Promise<number | null> {
  const response = await api.post('/books/remove', {
    id: bookID,
  });
  if (response.status === 404 || response.status === 500) {
    console.error(response.data);
    return null;
  }
  return response.data.id;
}
