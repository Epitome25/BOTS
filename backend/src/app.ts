import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import cors from 'cors';

config();
const app = express();

app.use(cors({origin: '*', credentials: true}));

app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', appRouter);
app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.send(`${process.env.COOKIE_SECRET}`);
});

app.all('/api/v1/user/*', userRouter);

export default app;
