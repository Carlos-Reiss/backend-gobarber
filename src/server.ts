import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import appError from './errors/AppError';
import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  /*  4 parametros pois é um middleware */
  if (err instanceof appError) {
    return response
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  }

  console.log(err);

  return response.status(500).json({ status: 'error', message: err.message });
});

const port = 3333;

app.listen(port, () => {
  console.log(`✔ server started on port: ${port} !`);
});
