import {Schema} from 'mongoose';
import {User} from './user.model';

const doctorSchema = new Schema({
  licenseNumber: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Doctor = User.discriminator('Doctor', doctorSchema);
