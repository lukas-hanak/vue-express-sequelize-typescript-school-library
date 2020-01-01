import {Request, Response} from 'express';
import {BookModel} from '../../models/book';
import {ErrorMessageType} from '../controllerInterface';

export const updateBook = (req: Request, res: Response) => {
  const body = req.body;
  BookModel.update(body, {
    where: {
      id: req.body.id,
    }
  })
    .then(([rowsChanged]) => {
      if (rowsChanged > 0) {
        BookModel.findOne(
          {
            where: {
              id: req.body.id,
            }
          })
          .then((book) => {
            res.status(200).json(book);
          }).catch((error) => {
          const message: ErrorMessageType = {
            error,
            time: new Date().toISOString(),
          };
          res.status(500).json(message);
        });
      } else {
        const message: ErrorMessageType = {
          error: 'nothing chaged',
          time: new Date().toISOString(),
        };
        res.status(404).json(message);
      }
    })
    .catch((error) => {
      const message: ErrorMessageType = {
        error,
        time: new Date().toISOString(),
      };
      res.status(500).json(message);
    });
};
