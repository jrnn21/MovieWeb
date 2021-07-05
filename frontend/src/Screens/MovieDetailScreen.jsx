import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../Actions/MovieActions';

const MovieDetailScreen = () => {
 const { mid } = useParams();
 const dispatch = useDispatch();

 const movieDetail = useSelector((state) => state.movieDetail);
 const { movie } = movieDetail;

 useEffect(() => {
  if (!movie || mid !== movie._id) {
   dispatch(getMovieById(mid));
  }
 }, [dispatch, mid]);
 console.log(mid);
 return (
  <div className="container">
   <div className="position-relative overflow-hidden">
    <img
     className="w-100"
     src="/uploads/videoUploads/default-slide.jpg"
     alt=""
    />
    {movie &&
    movie.slideImg !== '/uploads/videoUploads/default-slide.jpg' &&
    movie &&
    movie.slideImg !== '' ? (
     <img
      className="w-100 position-absolute"
      style={{ top: 0, left: 0 }}
      src={movie.slideImg}
      alt=""
     />
    ) : (
     <img
      className="w-100 position-absolute"
      style={{ top: 0, left: 0 }}
      src={movie && movie.img}
      alt=""
     />
    )}
   </div>
   <div className="d-flex">
    <div className="d-lg-block d-none" style={{ width: '400px' }}>
     <div
      className="bg-light p-1 rounded position-relative"
      style={{ maxWidth: '200px', top: '-130px', left: '90px' }}
     >
      <img className="w-100" src={movie && movie.img} alt="" />
     </div>
    </div>
    <div className="w-100">
     <h3 className="text-warning text-center text-lg-start mt-2">
      {movie && movie.movieName}
     </h3>
    </div>
   </div>
  </div>
 );
};

export default MovieDetailScreen;
