import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEpByMovie, getMovieById } from '../Actions/MovieActions';
import TypeBar from '../Components/TypeBar';
import axios from 'axios';
import Loader from '../Components/Loader';
import {
 EP_CREATE_RESET,
 MOVIE_DETAIL_RESET,
} from '../Constants/MovieConstants';

const PlayScreen = ({ match, history }) => {
 const { mid, ep } = match.params;
 const [epPlay, setEpPlay] = useState({ ep: '', url: '' });
 const [loadingEp, setLoadingEp] = useState(false);
 const dispatch = useDispatch();

 const movieDetail = useSelector((state) => state.movieDetail);
 const { movie } = movieDetail;
 const epByMovie = useSelector((state) => state.epByMovie);
 const { loading: epLoading, error: epError, episodes } = epByMovie;

 useEffect(() => {
  dispatch({ type: MOVIE_DETAIL_RESET });
  dispatch(getMovieById(mid));
 }, [dispatch, mid]);

 useEffect(() => {
  dispatch({ type: EP_CREATE_RESET });
  dispatch(getEpByMovie(mid));

  async function fetchData() {
   setLoadingEp(true);
   const { data } = await axios.get(`/api/movies/${mid}/episodes/${ep}`);
   setEpPlay({ ep: data.episode, url: data.videoUrl });
   setLoadingEp(false);
  }
  fetchData();
 }, [dispatch, mid, ep]);
 return (
  <>
   <div className="container mt-2">
    <div className="row">
     <div className="col-lg-9">
      <TypeBar
       typeBar={`${movie && movie.movieName} - ${epPlay.ep}`}
       barColor={'success'}
      />
      <div className="player-wrapper">
       {loadingEp ? (
        <div className="loader d-flex justify-content-center align-items-center">
         <Loader />
        </div>
       ) : (
        <iframe
         className="react-player"
         width="100%"
         height="100%"
         src={epPlay.url}
         frameBorder="0"
         allow="autoplay"
         allowFullScreen={true}
        ></iframe>
       )}
      </div>

      <div className="my-1" style={{ height: '400px' }}>
       <div className="p-3 bg-dark">
        <h5 className="khFont text-warning">{movie && movie.movieName}</h5>
       </div>
       <div className="ep mt-1">
        {episodes &&
         episodes.map((epi) => (
          <NavLink
           key={epi._id}
           to={`/movies/${mid}/episodes/${epi._id}`}
           className="py-2 px-3 nav-link border video btn d-inline-block m-1 cateItem t_light"
           activeClassName="bg-light t_warning"
          >
           {epi.episode}
          </NavLink>
         ))}
       </div>
      </div>
     </div>
     <div className="col-lg-3"></div>
    </div>
   </div>
  </>
 );
};

export default PlayScreen;
