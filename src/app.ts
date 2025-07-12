import express from 'express';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();

app.use('/api', router);

app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
