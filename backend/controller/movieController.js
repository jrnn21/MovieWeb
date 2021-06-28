import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModel.js';
import colors from 'colors';
import moment from 'moment';

// @desc    Fetch all movie slide
// @route   GET /api/movies/slide/img
// @access  Public
const getSlide = asyncHandler(async (req, res) => {
 const movies = await Movie.find({
  slideImg: {
   $ne: '/uploads/videoUploads/default-slide.jpg',
  },
 }).sort({ updatedAt: -1 });

 if (movies) {
  res.json(movies);
 } else {
  res.status(404);
  throw new Error('Movies not Found');
 }
});

// @desc    Fetch all movie update today
// @route   GET /api/movies/update/today
// @access  Public
const getMoviesUpdateToday = asyncHandler(async (req, res) => {
 var start = moment().startOf('day'); // set to 12:00 am today
 var end = moment().endOf('day'); // set to 23:59 pm today
 const movies = await Movie.find({
  updatedAt: { $gte: start, $lt: end },
 })
  .limit(3)
  .sort({ updatedAt: 1 });

 if (movies) {
  res.json(movies);
 } else {
  res.status(404);
  throw new Error('Movies not Found');
 }
});

//@desc    Fetch search movies
//@route   GET /api/search/movies
//@access  Public
const getMovies = asyncHandler(async (req, res) => {
 const pageSize = 24;
 const page = Number(req.query.pageNumber) || 1;

 const keyword = req.query.keyword
  ? {
     tag: {
      $regex: req.query.keyword,
      $options: 'i',
     },
    }
  : {};
 const count = await Movie.countDocuments({ ...keyword });
 const movies = await Movie.find({ ...keyword })
  .sort({ updatedAt: -1 })
  .limit(pageSize)
  .skip(pageSize * (page - 1));
 res.json({ movies, page, pages: Math.ceil(count / pageSize), count });
});

//@desc    Fetch movie detail
//@route   GET /api/movies/:mid
//@access  Public
const getMovieById = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const movie = await Movie.findById(mid);
 if (movie) {
  res.json(movie);
 } else {
  res.status(404);
  throw new Error('Movie not Found');
 }
});

//@desc    Create movie
//@route   POST /api/movies
//@access  Private Admin
const createMovie = asyncHandler(async (req, res) => {
 const movie = new Movie({
  user: req.user._id,
  movieType: 'រឿងភាគថៃ',
  img: '/uploads/videoUploads/default-image.jpg',
  tag: '',
  slideImg: '/uploads/videoUploads/default-slide.jpg',
  movieName: 'ដាក់ឈ្មោះ',
  updateMovie: 'ថ្មី',
  episodes: [],
 });
 const newMovie = await movie.save();
 res.status(201).json(newMovie);
});

//@desc    Delete movie
//@route   DELETE /api/movies/:mid
//@access  Private Admin
const deleteMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const movie = await Movie.findById(mid);
 if (movie) {
  const movieRemove = await movie.remove();
  res.json(movieRemove);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't be Delete`);
 }
});

//@desc    Update movie
//@route   PUT /api/movies/:mid
//@access  Private Admin
const updateMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const { movieEdit } = req.body;
 const movie = await Movie.findById(mid);
 if (movie) {
  movie.movieName = movieEdit.movieName;
  movie.movieType = movieEdit.movieType;
  movie.updateMovie = movieEdit.updateMovie;
  movie.img = movieEdit.img;
  movie.slideImg =
   movieEdit.slideImg || '/uploads/videoUploads/default-slide.jpg';
  movie.tag = movieEdit.tag;
  const movieUpdate = await movie.save();
  res.json(movieUpdate);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't be Updated`);
 }
});

//@desc    Update movie
//@route   PUT /api/img/:mid
//@access  Private Admin
const updateMovieImg = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const { img } = req.body;
 const movie = await Movie.findById(mid);
 console.log(req.body);
 if (movie) {
  movie.img = img;
  const movieUpdate = await movie.save();
  res.json(movieUpdate.img);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't be Updated`);
 }
});

//@desc    Update movie
//@route   PUT /api/img/:mid/slide
//@access  Private Admin
const updateMovieSlide = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const { slideImg } = req.body;
 const movie = await Movie.findById(mid);
 console.log(req.body);
 if (movie) {
  movie.slideImg = slideImg || '/uploads/videoUploads/default-slide.jpg';
  const movieUpdate = await movie.save();
  res.json(movieUpdate.img);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't be Updated`);
 }
});

//@desc    Fetch video movie
//@route   GET /api/movies/:mid/episodes
//@access  Public
const getEpByMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const movie = await Movie.findById(mid);
 if (movie) {
  const epByMovie = movie.episodes;
  res.json(epByMovie);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't get Ep`);
 }
});

//@desc    Create video movie
//@route   POST /api/movies/:mid/episodes
//@access  Private admin
const createEpByMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const { epCreate } = req.body;
 const movie = await Movie.findById(mid);
 if (movie) {
  movie.episodes.push({ episode: epCreate.name, videoUrl: epCreate.url });
  const epMovie = await movie.save();
  res.json(epMovie);
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't create ep`);
 }
});

//@desc    Update video movie
//@route   PUT /api/movies/:mid/episodes/:ep
//@access  Private admin
const updateEpByMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const ep = req.params.ep;
 const { epUpdate } = req.body;
 const movie = await Movie.findById(mid);
 if (movie) {
  const episode = movie.episodes.find((obj) => {
   return obj.id === ep;
  });
  if (episode) {
   episode.episode = epUpdate.name;
   episode.videoUrl = epUpdate.url;
   const epMovie = await movie.save();
   res.json(epMovie);
  }
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't update ep`);
 }
});

//@desc    Delete video movie
//@route   DELETE /api/movies/:mid/episodes/:ep
//@access  Private admin
const deleteEpByMovie = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const ep = req.params.ep;
 const movie = await Movie.findById(mid);
 if (movie) {
  const episode = movie.episodes.filter((obj) => {
   return obj.id !== ep;
  });
  if (episode) {
   movie.episodes = episode;
   await movie.save();
   res.json(movie.episodes);
  }
 } else {
  res.status(404);
  throw new Error(`Movie not Found! Can't delete ep`);
 }
});

//@desc    Fetch video movie
//@route   GET /api/movies/:mid/episodes/:ep
//@access  Public
const getEpById = asyncHandler(async (req, res) => {
 const mid = req.params.mid;
 const ep = req.params.ep;
 const movie = await Movie.findById(mid);
 if (movie) {
  const episode = movie.episodes.find((obj) => {
   return obj.id === ep;
  });
  if (episode) {
   res.json(episode);
  }
 } else {
  res.status(404);
  throw new Error(`Ep not Found!`);
 }
});

export {
 getMovies,
 createMovie,
 getMovieById,
 deleteMovie,
 updateMovie,
 getEpByMovie,
 createEpByMovie,
 updateEpByMovie,
 deleteEpByMovie,
 getEpById,
 getMoviesUpdateToday,
 getSlide,
 updateMovieImg,
 updateMovieSlide,
};
