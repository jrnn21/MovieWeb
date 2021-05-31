import React from 'react';
import { useHistory } from 'react-router';
import { BiPlayCircle } from 'react-icons/bi';

const VideoCard = ({ admin = false, movie }) => {
 const history = useHistory();
 const movieDetail = () => {
  history.push(`/adminPanel/movies/${movie._id}/edit`);
 };
 const movieDetailScreen = () => {
  if (movie && movie.episodes.length !== 0) {
   history.push(`/movies/${movie._id}/episodes/${movie.episodes[0]._id}`);
  }
 };

 return (
  <>
   <div
    className="card w-100 videoCard position-relative overflow-hidden shadow"
    style={{ width: '18rem' }}
    onClick={admin ? movieDetail : movieDetailScreen}
   >
    <img
     className="w-100 h-100"
     src="/uploads/videoUploads/default-image.jpg"
     alt=""
    />
    <img src={movie.img} className="card-img-top position-absolute" alt="..." />
    <div className="card-body position-absolute bottom-0 text-light text-center w-100 cardHover">
     <h6 className="card-title khFont text-warning">{movie.movieName}</h6>
     <div className="d-flex justify-content-end">
      <small className="khFont text-right d-inline-block">
       episodes {movie.episodes.length}
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
  </>
 );
};

export default VideoCard;
