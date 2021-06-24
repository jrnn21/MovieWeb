import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const MovieToday = () => {
 const [movies, setMovies] = useState([]);
 const history = useHistory();

 useEffect(() => {
  async function fetchData() {
   const { data } = await axios.get('/api/movies/update/today');
   console.log(data);
   setMovies(data);
  }
  fetchData();
 }, []);

 const movieDetailScreen = (movie) => {
  if (movie && movie.episodes.length !== 0) {
   history.push(`/movies/${movie._id}/episodes/${movie.episodes[0]._id}`);
  }
 };
 return (
  <div className="d-flex flex-wrap flex-md-nowrap flex-lg-wrap justify-content-between">
   {movies &&
    movies.map((m) => (
     <div
      className="p-1 bg-dark mb-1 d-flex todayItem"
      key={m._id}
      style={{ maxWidth: '550px', minWidth: '200px' }}
      onClick={() => movieDetailScreen(m)}
     >
      <div className="w-25 overflow-hidden position-relative">
       <img
        className="w-100 h-100"
        src="/uploads/videoUploads/default-image.jpg"
        alt=""
       />
       <img
        className="position-absolute w-100 h-100"
        src={m.img}
        alt=""
        style={{ top: 0, left: 0 }}
       />
      </div>
      <div className="d-flex justify-content-center align-items-center w-100">
       <div className="w-100 mx-2">
        <h6 className="text-warning khFont text-center">{m.movieName}</h6>
        <div className="d-flex justify-content-between mx-3">
         <small className="text-info text-center">{m.updateMovie}</small>
         <small className="text-light text-center">
          episodes {m.episodes.length}
         </small>
        </div>
       </div>
      </div>
     </div>
    ))}
  </div>
 );
};

export default MovieToday;
