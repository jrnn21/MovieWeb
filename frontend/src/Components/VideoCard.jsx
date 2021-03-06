import React from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import axios from 'axios';
import { MOVIE_DETAIL_SUCCESS } from '../Constants/MovieConstants';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import imgDefault from '../Image/default-image.jpg';

const VideoCard = ({ admin = false, movie }) => {
 const dispatch = useDispatch();
 const history = useHistory();
 const movieDetail = () => {
  history.push(`/adminPanel/movies/${movie._id}/edit`);
 };
 const movieDetailScreen = async () => {
  const { data } = await axios.get(`/api/movies/${movie._id}`);
  if (data) {
   dispatch({ type: MOVIE_DETAIL_SUCCESS, payload: data });
   history.push(`/movies/${movie._id}`);
  }
 };

 return (
  <>
   <div
    className="w-100 videoCard position-relative overflow-hidden shadow"
    style={{ width: '18rem' }}
    onClick={admin ? movieDetail : movieDetailScreen}
   >
    <img className="w-100 h-100" src={imgDefault} alt="" />
    <img
     style={{ top: 0, left: 0 }}
     src={movie.img}
     className="position-absolute w-100 "
     alt="..."
    />
    <div className="card-body position-absolute bottom-0 text-light text-center w-100 cardHover">
     <div className="d-flex justify-content-end">
      <small className="khFont text-right d-inline-block text-warning">
       ep {movie.ep}
      </small>
     </div>
    </div>
    <div
     className="cardH position-absolute w-100 h-100"
     onClick={admin ? movieDetail : movieDetailScreen}
    >
     <div className="position-absolute" style={{ top: '38%', right: '36%' }}>
      <BiPlayCircle className="text-light" fontSize="300%" />
     </div>
    </div>
    <p
     className={`${
      movie.updateMovie === 'មិនដាក់' ? 'd-none' : 'bg-warning'
     } position-absolute rounded `}
     style={{
      top: '8px',
      left: '5px',
      padding: '3px 10px 1px 10px',
      fontSize: '90%',
     }}
    >
     {movie.updateMovie}
    </p>
   </div>
   <p
    className="card-title khFont text-light text-center mt-2 px-1 mb-3 nameMovie"
    style={{ fontSize: '90%', cursor: 'pointer' }}
    onClick={admin ? movieDetail : movieDetailScreen}
   >
    {movie.movieName}
   </p>
  </>
 );
};

export default VideoCard;
