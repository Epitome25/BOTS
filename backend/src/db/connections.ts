import {connect, disconnect} from 'mongoose';

export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error(error);
    throw new Error('MongoDB connection failed');
  }
};

export const disconnectDB = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.error(error);
    throw new Error('MongoDB disconnection failed');
  }
};
