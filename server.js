import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

// routers 
import jobRouter from './routers/jobRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'

/* Morgan - HTTP request logger middleware for node.js */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Accept JSON / Setup express middleware to accept JSON */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log('%cqqq: req', 'color: green;', req);
  res.json({ message: 'Data received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

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
