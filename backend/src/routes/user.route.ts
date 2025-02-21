import {Router} from 'express';
import { getHealthMetric, } from '../utils/healthdataextractionapi.utils';

const userRouter = Router();

userRouter.all('/*',getHealthMetric);

export default userRouter;
