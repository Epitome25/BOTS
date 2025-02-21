import {body} from 'express-validator';

export const loginValidator = [
  body('email').notEmpty().trim().isEmail().withMessage('Invalid Email'),
  body('password')
    .notEmpty()
    .trim()
    .isLength({min: 8})
    .withMessage('Password must be atleast 8 characters long'),
];
