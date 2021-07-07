import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
 createMovie,
 getMovies,
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
 getDescByMovie,
 createDescByMovie,
 updateDescByMovie,
 deleteDescByMovie,
 toggleSlide,
} from '../controller/movieController.js';

const router = express.Router();

router.route('/').get(getMovies).post(protect, admin, createMovie);
router
 .route('/:mid')
 .get(getMovieById)
 .delete(protect, admin, deleteMovie)
 .put(protect, admin, updateMovie);

router
 .route('/:mid/episodes')
 .get(getEpByMovie)
 .post(protect, admin, createEpByMovie);

router
 .route('/:mid/episodes/:ep')
 .get(getEpById)
 .put(protect, admin, updateEpByMovie)
 .delete(protect, admin, deleteEpByMovie);

router
 .route('/:mid/descrip')
 .get(getDescByMovie)
 .post(protect, admin, createDescByMovie);

router
 .route('/:mid/descrip/:desc')
 .put(protect, admin, updateDescByMovie)
 .delete(protect, admin, deleteDescByMovie);

router.route('/update/today').get(getMoviesUpdateToday);
router.route('/slide/img').get(getSlide);
router.route('/slide/toggle/:mid').put(protect, admin, toggleSlide);

export default router;
