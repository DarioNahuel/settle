import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.FIXER_BASE_URL) {
    throw new Error('FIXER_BASE_URL must be defined');
  }

  if (!process.env.FIXER_API_KEY) {
    throw new Error('FIXER_API_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://rate-mongo-srv:27017/rate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
