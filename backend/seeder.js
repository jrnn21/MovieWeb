import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/User.js';
import movies from './data/Movie.js';
import User from './models/userModel.js';
import Movie from './models/movieModel.js';
import connectDB from './config/db.js';
import colors from 'colors';

dotenv.config();
connectDB();

const importData = async () => {
 try {
  await User.deleteMany();
  await Movie.deleteMany();

  const createUser = await User.insertMany(users);
  const adminUser = createUser[0]._id;

  const sampleMovies = movies.map((movie) => {
   return { ...movie, user: adminUser };
  });

  await Movie.insertMany(sampleMovies);

  console.log('Data Imported!'.green.inverse);
  process.exit();
 } catch (error) {
  console.error(`${error}`.red.inverse);
  process.exit(1);
 }
};

const destroyData = async () => {
 try {
  await Movie.deleteMany();
  await User.deleteMany();

  console.log('Data Destroyed!'.red.inverse);
  process.exit();
 } catch (error) {
  console.error(`${error}`.red.inverse);
  process.exit(1);
 }
};

if (process.argv[2] === '-d') {
 destroyData();
} else {
 importData();
}
