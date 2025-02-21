import {Router} from 'express';
import userRouter from './user.route';

const appRouter = Router();
appRouter.use('/user', userRouter);

export default appRouter;
