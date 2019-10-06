import 'dotenv/config';
import path from 'path';
import express from 'express';
import 'express-async-errors';
import './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
