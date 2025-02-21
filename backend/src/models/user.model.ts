import {Schema, model} from 'mongoose';

const userSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['patient', 'doctor'],
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    pfp: {
      type: String,
      default: '',
    },
  },
  {timestamps: true, discriminatorKey: 'type'},
);

export const User = model('User', userSchema);
