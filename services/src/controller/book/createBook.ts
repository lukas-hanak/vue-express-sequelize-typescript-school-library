import {Request, Response} from 'express';
import {BookModel} from '../../models/book';
import {ErrorMessageType} from '../controllerInterface';

export const createBook = (req: Request, res: Response) => {
  BookModel.create(req.body)
    .then((book) => {
    res.status(200).json(book);
    })
    .catch((error) => {
    const message: ErrorMessageType = {
      error,
      time: new Date().toISOString(),
    };
    res.status(500).json(message);
  });
};
