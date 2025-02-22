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
app.use(express.static(__dirname + '/DocEase'));

app.get('/login',(req,res)=>{
  res.sendFile(__dirname+"/DocEase/loginPage.html")
})

app.get('/signup',(req,res)=>{
  res.sendFile(__dirname+"/DocEase/signupPage.html")
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/DocEase/index.html")
})

app.get('/doctor',(req,res)=>{
  res.sendFile(__dirname+"/DocEase/doctor/index.html")
})

app.all('/api/v1/user/*', userRouter);

export default app;
