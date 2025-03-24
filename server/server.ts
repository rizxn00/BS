import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routers/routes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8000', 10);

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL || '')
  .then(() => console.log('Connected To MongoDB...'))
  .catch((err) => console.log(err));

app.use(routes);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));