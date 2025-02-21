import {sign} from 'jsonwebtoken';

export const generateToken = (id: string, email: string, expiresIn: number) => {
  const userObject = {id, email};
  const token = sign(userObject, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
  return token;
};
