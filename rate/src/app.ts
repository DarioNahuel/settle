import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/provider-rates';
import { createRateRouter } from './routes/create-rate';
import { getRateRouter } from './routes/get-rate';
import { documentationRouter } from './routes/documentation';
import { NotFoundError } from './utils/errors';
import { errorHandler } from './http/middlewares';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(currentUserRouter);
app.use(createRateRouter);
app.use(getRateRouter);
app.use(documentationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
