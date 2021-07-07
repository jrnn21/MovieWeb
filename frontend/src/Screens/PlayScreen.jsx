import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getEpByMovie, getMovieById } from '../Actions/MovieActions';
import TypeBar from '../Components/TypeBar';
import axios from 'axios';
import Loader from '../Components/Loader';
import MovieToday from '../Components/MovieToday';
import { EP_LIST_RESET } from '../Constants/MovieConstants';

const PlayScreen = ({ match, history }) => {
 const { mid, ep } = match.params;
 const [epPlay, setEpPlay] = useState({ ep: '', url: '' });
 const [loadingEp, setLoadingEp] = useState(false);
 const dispatch = useDispatch();

 const movieDetail = useSelector((state) => state.movieDetail);
 const { loading, error, movie } = movieDetail;
 const epByMovie = useSelector((state) => state.epByMovie);
 const { episodes } = epByMovie;

 useEffect(() => {
  dispatch(getMovieById(mid));
 }, [dispatch, mid]);

 useEffect(() => {
  window.scroll(0, 0);
  dispatch(getEpByMovie(mid, 'asc'));

  async function fetchData() {
   setLoadingEp(true);
   const { data } = await axios.get(`/api/movies/${mid}/episodes/${ep}`);
   setEpPlay({ ep: data.episode, url: data.videoUrl });
   setLoadingEp(false);
  }
  fetchData();
 }, [dispatch, mid, ep]);

 useEffect(() => {
  dispatch({ type: EP_LIST_RESET });
 }, [dispatch]);
 return (
  <>
   <div className="container mt-2" style={{ minHeight: '100vh' }}>
    <div className="row">
     <div className="col-lg-9">
      {loading ? (
       <Loader />
      ) : error ? (
       <Redirect to="/error" />
      ) : (
       <>
        <TypeBar
         typeBar={`${movie && movie.movieName} - ${epPlay.ep}`}
         barColor={'dark'}
        />
        <div className="player-wrapper">
         {loadingEp ? (
          <div className="loader d-flex justify-content-center align-items-center">
           <Loader wh={40} color={'text-light'} />
          </div>
         ) : (
          <iframe
           className="react-player"
           style={{ background: '#485864' }}
           width="100%"
           height="100%"
           src={epPlay.url}
           frameBorder="0"
           allow="autoplay"
           allowFullScreen={true}
          ></iframe>
         )}
        </div>
       </>
      )}
      <div className="my-1" style={{ height: '400px' }}>
       <h6 className="khFont text-warning bg-dark" style={{ padding: 15 }}>
        {movie && movie.movieName}
       </h6>
       <div className="ep mt-1">
        {episodes &&
         episodes.map((epi) => (
          <NavLink
           key={epi._id}
           to={`/movies/${mid}/episodes/${epi._id}`}
           className="py-2 px-4 nav-link video btn d-inline-block m-1 cateItem t_light"
           style={{ background: '#2c3e50' }}
           activeClassName="bg-light t_warning"
          >
           {epi.episode}
          </NavLink>
         ))}
       </div>
      </div>
     </div>
     <div className="col-lg-3">
      <h4 className="text-warning en mt-3">On Social</h4>
      <iframe
       className="border-2 border border-dark"
       src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDrama855-107840864891869&tabs&width=340&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
       width="100%"
       height="130"
       style={{ border: 'none', overflow: 'hidden' }}
       scrolling="no"
       frameBorder="0"
       allowfullscreen="true"
       allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
      <h6 className="text-warning mt-3 mb-2">New Movie Today</h6>
      <MovieToday />
     </div>
    </div>
   </div>
  </>
 );
};

export default PlayScreen;
