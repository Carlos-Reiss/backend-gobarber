import express from 'express';
import routes from './routes';

import './database';

import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use(routes);

const port = 3331;

app.listen(port, () => {
  console.log(`✔ server started on port: ${port} !`);
});
