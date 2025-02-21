import {Router} from 'express';
import {getHealthMetric} from '../utils/healthdataextractionapi.utils';
import {loginUser, signupUser} from '../controllers/auth.controller';
import {validate} from '../middleware/validate.middleware';
import {
  doctorValidation,
  patientValidation,
  userSignupValidator,
} from '../utils/signupvalidator.utils';
import {
  createPrescription,
  getPrescriptions,
} from '../controllers/prescription.controller';
import {
  discardMedication,
  getMedications,
  undoDiscardMedication,
} from '../controllers/medication.controller';
import {loginValidator} from '../utils/loginvalidator.utils';
import {authoriseToken, verifyDoctor} from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.post(
  '/signup',
  (req, res, next) => {
    if (req.body.type === 'doctor') {
      return validate([...userSignupValidator, ...doctorValidation])(
        req,
        res,
        next,
      );
    } else {
      return validate([...userSignupValidator, ...patientValidation])(
        req,
        res,
        next,
      );
    }
  },
  signupUser,
);

userRouter.post('/login', validate(loginValidator), loginUser);
userRouter.get('/getPrescription/:userId', authoriseToken, getPrescriptions);
userRouter.post(
  '/createPrescription',
  authoriseToken,
  verifyDoctor,
  createPrescription,
);
userRouter.get('/getMedications/:userId', authoriseToken, getMedications);
userRouter.post(
  '/discardMedication',
  authoriseToken,
  verifyDoctor,
  discardMedication,
);
userRouter.post(
  '/undoDiscardMedication',
  authoriseToken,
  verifyDoctor,
  undoDiscardMedication,
);

userRouter.all('/*', getHealthMetric);

export default userRouter;
