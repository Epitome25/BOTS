import {NextFunction, Request, Response} from 'express';
import {verify, JsonWebTokenError, JwtPayload} from 'jsonwebtoken';
import {User} from '../models/user.model';

export const authoriseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const token = req.signedCookies['auth_token'];
  if (!token) {
    return res.status(401).json({message: 'Token Not Received'});
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    res.locals.jwtData = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({message: error.name});
    }
    return res.status(401).json({message: 'Invalid token'});
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = res.locals.jwtData.id;
    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({message: 'User not found'});
    }

    res.locals.user = userExist;
  } catch (error: any) {
    return res
      .status(500)
      .json({message: 'ERROR', cause: error.message});
  }
};

export const verifyDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const userId = res.locals.jwtData.id;
    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({message: 'User not found'});
    }

    if (userExist.type !== 'doctor') {
      return res
        .status(403)
        .json({message: 'Access Denied. User is not a doctor.'});
    }

    next();
  } catch (error: any) {
    return res
      .status(500)
      .json({message: 'ERROR', cause: error.message});
  }
};
