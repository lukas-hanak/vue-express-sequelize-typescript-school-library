import {Express} from 'express';
import {homeController} from './home/home';
import {getAllBooksController} from './book/getAllBooks';
import {createBook} from './book/createBook';
import {removeBook} from './book/removeBook';
import {updateBook} from './book/updateBook';


export const router = (app: Express) => {
  app.get('/', homeController);
  app.get('/books', getAllBooksController);
  app.post('/books/create', createBook);
  app.post('/books/remove', removeBook);
  app.post('/books/update', updateBook);
};
