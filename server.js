import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';

// routers 
import jobRouter from './routes/jobRouter.js';
app.use('/api/v1/jobs', jobRouter);

/* Morgan - HTTP request logger middleware for node.js */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
/* Accept JSON / Setup express middleware to accept json */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log('%cqqq: req', 'color: green;', req);
  res.json({ message: 'Data received', data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

/* Not Found Middleware 
  "not found" middleware is specifically designed to handle requests for non-existent routes.
*/
app.use('*',  (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

/* Middleware Middleware 
   "error" middleware is a catch-all for handling unexpected errors that occur during request processing.
*/
app.use((err, req, res, next) => {
  console.log('%cqqq: err', 'color: green;', err);
  res.status(500).json({ msg: 'Something went wrong' });
})

/* listeners */
const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}....`);
});