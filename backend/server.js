import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import movieRoute from './routes/movieRoute.js';
import userRoute from './routes/userRouter.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/api/uploads/img', uploadRoutes);

const __dirname = path.resolve();
app.use(
 '/uploads/videoUploads',
 express.static(path.join(__dirname, '/uploads/videoUploads'))
);

if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, '/frontend/build')));

 app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
 );
} else {
 app.get('/', (req, res) => {
  res.send('API is running....');
 });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 22;

app.listen(
 PORT,
 console.log(
  `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
 )
);
