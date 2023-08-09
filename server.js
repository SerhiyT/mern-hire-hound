import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers 
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js';

/* Morgan - HTTP request logger middleware for node.js */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Accept JSON / Setup express middleware to accept JSON */
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

/* Not Found Middleware 
  "not found" middleware is specifically designed to handle requests for non-existent routes.
*/
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

/* Error Middleware 
   "error" middleware is a catch-all for handling unexpected errors that occur during request processing.
*/
app.use(errorHandlerMiddleware);

/* listeners */
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
