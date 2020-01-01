import {Request, Response} from 'express';
import {BookModel} from '../../models/book';
import {ErrorMessageType} from '../controllerInterface';

export const getAllBooksController = (req: Request, res: Response) => {
  const sortedBy = req.query && req.query['sortedBy'] || 'id';
  const orderBy = req.query && req.query['orderBy'] || 'asc';
  BookModel.findAll({
    order: [
      [sortedBy, orderBy],
    ]
  })
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      const message: ErrorMessageType = {
        error,
        time: new Date().toISOString(),
      };
      res.status(500).json(message);
    });
};
