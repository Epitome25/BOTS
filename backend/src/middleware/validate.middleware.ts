import {NextFunction, Request, Response} from 'express';
import {ValidationChain, validationResult} from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const error = validationResult(req);
    if (error.isEmpty()) return next();
    else return res.status(400).json({errors: error.array()});
  };
};
