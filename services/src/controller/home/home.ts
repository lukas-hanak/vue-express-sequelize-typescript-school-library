import {Request, Response} from 'express';

export const homeController = (req: Request, res: Response) => {
  res.send({status: 'server is runnig'});
};
