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

const movieSchema = mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  movieType: { type: String, required: true },
  img: { type: String },
  slideImg: { type: String },
  tag: { type: String },
  movieName: { type: String, required: true },
  updateMovie: { type: String, required: true },
  episodes: [episode],
 },
 {
  timestamps: true,
 }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
