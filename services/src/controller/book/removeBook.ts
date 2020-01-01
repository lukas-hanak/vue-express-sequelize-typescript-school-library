import {Request, Response} from 'express';
import {BookModel} from '../../models/book';
import {ErrorMessageType} from '../controllerInterface';

export const removeBook = (req: Request, res: Response) => {
  const body = req.body;
  BookModel.destroy({
    where: {
      id: body.id
    }
  }).then((value) => {
    if (value === 1) {
      return res.status(200).json(body);
    } else {
      const message: ErrorMessageType = {
        error: 'nothing found',
        time: new Date().toISOString(),
      };
      return res.status(404).json(message);
    }
  }).catch((error) => {
    const message: ErrorMessageType = {
      error,
      time: new Date().toISOString(),
    };
    res.status(500).json(message);
  });
};
