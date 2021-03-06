import mongoose from 'mongoose';

const episode = mongoose.Schema(
 {
  episode: { type: String, required: true },
  videoUrl: { type: String, required: true },
 },
 {
  timestamps: true,
 }
);

const descrip = mongoose.Schema(
 {
  desc: String,
  text: String,
 },
 {
  timestamps: true,
 }
);

const movieSchema = mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  movieType: { type: String, required: true },
  img: { type: String },
  slideImg: { type: String },
  toggleSlide: { type: Boolean },
  tag: { type: String },
  movieName: { type: String, required: true },
  descriptions: [descrip],
  updateMovie: { type: String, required: true },
  episodes: [episode],
 },
 {
  timestamps: true,
 }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
