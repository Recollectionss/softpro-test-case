import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import router from './router';
import { errorMiddleware } from './middlewares/error.middleware';
import { rateLimiter } from './core/rate-limiter';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', rateLimiter);

app.use('/api', router);

app.use(errorMiddleware);

export default app;
