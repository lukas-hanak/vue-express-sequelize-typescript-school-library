import express, {Express} from 'express';
import cors from 'cors';
import {router} from '../controller';

const PORT = 30000;

class Server {
  app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.listen(PORT, () =>
      console.log(`server is running at http://locahost:${PORT}`)
    );
    router(this.app);
  }
}

new Server();
