import express from 'express';
import {
 updateMovieImg,
 updateMovieSlide,
} from '../controller/movieController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:mid').put(protect, admin, updateMovieImg);
router.route('/:mid/slide').put(protect, admin, updateMovieSlide);

export default router;
