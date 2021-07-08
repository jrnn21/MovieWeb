import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getEpByMovie, getMovieById } from '../Actions/MovieActions';
import { MdPlayCircleFilled } from 'react-icons/md';
import axios from 'axios';
import { MOVIE_DETAIL_SUCCESS } from '../Constants/MovieConstants';
import MovieToday from '../Components/MovieToday';
import { BiCommentDetail } from 'react-icons/bi';

const MovieDetailScreen = () => {
 const { mid } = useParams();
 const dispatch = useDispatch();
 const history = useHistory();

 const movieDetail = useSelector((state) => state.movieDetail);
 const { movie } = movieDetail;
 const epByMovie = useSelector((state) => state.epByMovie);
 const { episodes } = epByMovie;

 useEffect(() => {
  window.scroll(0, 0);
  if (!movie || mid !== movie._id) {
   dispatch(getMovieById(mid));
  }
 }, [dispatch, mid]);

 useEffect(() => {
  dispatch(getEpByMovie(mid, 'desc'));
 }, [dispatch, mid]);

 const gotoPlayScreen = async () => {
  const { data } = await axios.get(`/api/movies/${movie._id}`);
  if (data && data.episodes[0]._id) {
   dispatch({ type: MOVIE_DETAIL_SUCCESS, payload: data });
   history.push(`/movies/${movie._id}/episodes/${data.episodes[0]._id}`);
  }
 };

 return (
  <div className="container">
   <div className="position-relative overflow-hidden d-none d-md-block">
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
    <div
     className="w-100 h-100 position-absolute"
     style={{ top: 0, background: 'rgba(0, 0, 0, 0.404)' }}
    >
     <MdPlayCircleFilled
      className="position-absolute playIcon"
      style={{
       fontSize: '6rem',
       color: 'rgb(255, 255, 255)',
       left: 0,
       right: 0,
       marginLeft: 'auto',
       marginRight: 'auto',
       top: 0,
       bottom: 0,
       marginTop: 'auto',
       marginBottom: 'auto',
       cursor: 'pointer',
      }}
      onClick={gotoPlayScreen}
     />
    </div>
   </div>
   <div className="d-block d-md-none" style={{ marginBottom: '100px' }}>
    <img className="w-100" src={movie && movie.img} alt="" />
    <MdPlayCircleFilled
     className="position-absolute playIcon"
     style={{
      fontSize: '6rem',
      color: 'rgb(255, 255, 255)',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      top: 0,
      bottom: '20%',
      marginTop: 'auto',
      marginBottom: 'auto',
      cursor: 'pointer',
     }}
     onClick={gotoPlayScreen}
    />
    <h3 className="text-warning mt-2 text-center">
     {movie && movie.movieName}
    </h3>

    <p className="text-light mt-4 text-center">
     Episodes :{' '}
     <span className="text-dark fw-bolder px-1 rounded bg-warning">
      {movie && movie.episodes.length}
     </span>
    </p>
    <p className="kh text-info text-center">{movie && movie.movieType}</p>
    <p></p>
   </div>
   <div className="d-none d-md-block">
    <div className="d-flex">
     <div className="" style={{ width: '400px' }}>
      <div
       className="bg-dark p-1 position-relative"
       style={{ maxWidth: '170px', top: '-110px', left: '20%' }}
      >
       <img className="w-100" src={movie && movie.img} alt="" />
      </div>
     </div>
     <div className="w-100">
      <h3 className="text-warning mt-2">{movie && movie.movieName}</h3>

      <p className="text-light mt-4">
       Episodes :{' '}
       <span className="text-dark fw-bolder px-1 rounded bg-warning">
        {movie && movie.episodes.length}
       </span>
      </p>
      <p className="kh text-info">{movie && movie.movieType}</p>
     </div>
    </div>
   </div>

   <div className="row position-relative" style={{ top: '-100px' }}>
    <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
    <ins
     class="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-format="fluid"
     data-ad-layout-key="-ef+6k-30-ac+ty"
     data-ad-client="ca-pub-7022107088023659"
     data-ad-slot="5901505584"
    ></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    <div className="col-lg-9">
     {movie &&
      movie.descriptions.map((desc) => (
       <div key={desc._id}>
        <h4 className="kh mt-3 text-warning">
         <BiCommentDetail /> {desc.desc} :
        </h4>
        <p className="text-light kh lh-base text-break">
         <span className="ms-5"></span>
         {desc.text}
        </p>
       </div>
      ))}
     <br />

     <h4 className="text-warning">Episodes :</h4>
     <div className="ep mt-1">
      {episodes &&
       episodes.map((epi) => (
        <NavLink
         key={epi._id}
         to={`/movies/${mid}/episodes/${epi._id}`}
         className="py-2 px-3 nav-link video cateItem t_light"
         style={{ marginBottom: 1 }}
         activeClassName="bg-light t_warning"
        >
         <span className="text-warning">{movie.movieName}</span> {' - '}{' '}
         {epi.episode}
        </NavLink>
       ))}
     </div>
    </div>
    <div className="col-lg-3 topMove">
     <h4 className="text-warning en mt-3">On Social</h4>
     <iframe
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDrama855-107840864891869&tabs&width=340&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
      width="100%"
      height="130"
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling="no"
      frameBorder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
     ></iframe>
     <amp-ad
      width="100vw"
      height="320"
      type="adsense"
      data-ad-client="ca-pub-7022107088023659"
      data-ad-slot="7707457568"
      data-auto-format="rspv"
      data-full-width=""
     >
      <div overflow=""></div>
     </amp-ad>
     <h5 className="text-warning mt-3">New Movies Today</h5>
     <MovieToday />
    </div>
   </div>
  </div>
 );
};

export default MovieDetailScreen;
