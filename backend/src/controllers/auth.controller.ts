import {Request, Response} from 'express';
import {User} from '../models/user.model';
import {generateToken} from '../utils/tokenManager.utils';
import {Doctor} from '../models/doctor.model';
import {Patient} from '../models/patient.model';

export const signupUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const {type, name, email, password, age, gender, pfp, ...otherDetails} =
      req.body;

    let newUser;

    if (type === 'doctor') {
      newUser = new Doctor({
        name,
        email,
        password,
        age,
        gender,
        pfp,
        ...otherDetails,
      });
    } else if (type === 'patient') {
      newUser = new Patient({
        name,
        email,
        password,
        age,
        gender,
        pfp,
        ...otherDetails,
      });
    } else {
      return res.status(400).json({message: 'Invalid user type'});
    }
    await newUser.save();

    res.clearCookie('auth_token', {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const token = generateToken(newUser._id.toString(), email, expiresIn);

    res.cookie('auth_token', token, {
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + expiresIn),
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      id: newUser._id.toString(),
    });
  } catch (error: any) {
    return res.status(400).json({message: 'ERROR', cause: error.message});
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).json({message: 'Invalid Credentials'});
    }
    if (user.password !== password) {
      return res.status(404).json({message: 'Invalid Credentials'});
    }
    res.clearCookie('auth_token', {
      httpOnly: true,
      path: '/',
      signed: true,
      domain: 'localhost',
    });
    const expiresIn: number = 7 * 24 * 60 * 60 * 1000;
    const token = generateToken(user._id.toString(), user.email, expiresIn);
    res.cookie('auth_token', token, {
      httpOnly: true,
      path: '/',
      signed: true,
      domain: 'localhost',
      expires: new Date(Date.now() + expiresIn),
    });
    return res.status(200).json({
      message: 'User logged in successfully',
      id: user._id.toString(),
    });
  } catch (error: any) {
    return res.status(400).json({message: 'ERROR', cause: error.message});
  }
};
