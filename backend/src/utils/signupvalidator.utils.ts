import {body} from 'express-validator';

export const userSignupValidator = [
  body('email').notEmpty().trim().isEmail().withMessage('Invalid Email'),
  body('password')
    .notEmpty()
    .trim()
    .isLength({min: 8})
    .withMessage('Password must be atleast 8 characters long'),
  body('name').notEmpty().trim(),
  body('age')
    .notEmpty()
    .trim()
    .isInt({min: 0, max: 200})
    .withMessage('Age must be between 0 and 200'),
  body('gender')
    .notEmpty()
    .trim()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),
  body('type').notEmpty().trim().isIn(['patient', 'doctor']),
];

export const patientValidation = [
  body('weight')
    .isFloat({min: 1})
    .withMessage('Weight must be a positive number'),
  body('height')
    .isFloat({min: 1})
    .withMessage('Height must be a positive number'),
  body('bloodType').notEmpty().withMessage('Blood type is required'),
  body('allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array'),
  body('dateOfBirth').isISO8601().withMessage('Invalid date format'),
  body('diabetesType')
    .isIn(['type1', 'type2'])
    .withMessage('Diabetes type must be either type1 or type2'),
];

export const doctorValidation = [
  body('licenseNumber').notEmpty().trim(),
  body('speciality').notEmpty().trim(),
  body('experience')
    .isInt({min: 0})
    .withMessage('Experience must be a positive number'),
];
