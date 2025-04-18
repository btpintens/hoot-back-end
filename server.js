// npm
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';

// Import routers
import authRouter from './controllers/auth.js';
import testJwtRouter from './controllers/test-jwt.js';
import usersRouter from './controllers/users.js';
import hootsRouter from './controllers/hoots.js';



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);
app.use('/hoots', hootsRouter);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('The express app is ready!');
});
