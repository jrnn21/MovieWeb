import React, { useEffect, useState } from 'react';
import VideoCard from '../Components/VideoCard';
import PopularMovie from '../Components/PopularMovie';
import { useDispatch, useSelector } from 'react-redux';
import { MOVIE_LIST_RESET } from '../Constants/MovieConstants';
import { getMovies } from '../Actions/MovieActions';
import { NavLink, useLocation } from 'react-router-dom';
import Paginate from '../Components/Paginate';
import queryString from 'query-string';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import MovieToday from '../Components/MovieToday';
import { Helmet } from 'react-helmet';
import NoVideo from '../Components/NoVideo';
import { RiMovieLine } from 'react-icons/ri';
import About from '../Components/About';
import FacebookPage from '../Components/FacebookPage';
import AdSense from 'react-adsense';

const HomeScreen = ({ match, history }) => {
 const pageNumber = match.params.pageNumber || 1;
 const location = useLocation();
 const query = queryString.parse(location.search);
 const keyword = query.keyword || '';
 const [word, setWord] = useState(query.keyword || '');

 const dispatch = useDispatch();
 const movieList = useSelector((state) => state.movieList);
 const {
  loading: movieListLoading,
  error: movieListError,
  movies,
  page,
  pages,
  count,
 } = movieList;
 useEffect(() => {
  dispatch({ type: MOVIE_LIST_RESET });
  dispatch(getMovies(pageNumber, keyword));
 }, [dispatch, pageNumber, keyword, word]);

 console.log(movieList);

 return (
  <>
   <Helmet>
    <link
     rel="icon"
     href="https://image.shutterstock.com/image-vector/outstanding-professional-elegant-trendy-awesome-600w-1247235529.jpg"
    />
    <title>Drama855 {keyword ? `- ${keyword}` : ''}</title>
   </Helmet>
   <div
    className="container-fluid pt-5 position-relative d-none"
    style={{ minHeight: 200, background: '#cbe8ff' }}
   >
    <div className="container"></div>
   </div>
   <div className="container position-relative" style={{ minHeight: '100vh' }}>
    <PopularMovie />
    <div className="row">
     <div className="col-lg-9 mx-0 px-0">
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
      <AdSense.Google
       client="ca-pub-7022107088023659"
       slot="5901505584"
       style={{ display: 'block' }}
       format="auto"
       responsive="true"
       layoutKey="-ef+6k-30-ac+ty"
      />
      <div style={{ marginTop: 10 }}></div>
      <h4 className="text-warning">
       <RiMovieLine style={{ marginTop: '-5px' }} />{' '}
       {keyword ? 'SEARCH - ' + keyword : 'MOVIES '}
      </h4>
      {movieListLoading ? (
       <div className="mt-2" style={{ height: '30vh' }}>
        <Loader />
       </div>
      ) : movieListError ? (
       <Message variant="danger">{movieListError}</Message>
      ) : (
       <>
        {movies && movies.length !== 0 ? (
         <>
          <div className="m-0 p-0 row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-3">
           {movies &&
            movies.map((movie) => (
             <div className="col m-0 p-1" key={movie._id}>
              <VideoCard movie={movie} />
             </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
           <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
           />
          </div>
         </>
        ) : (
         <NoVideo keyword={keyword} />
        )}
       </>
      )}
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
      <AdSense.Google
       client="ca-pub-7022107088023659"
       slot="5901505584"
       style={{ display: 'block' }}
       format="auto"
       responsive="true"
       layoutKey="-ef+6k-30-ac+ty"
      />
      <About />
     </div>
     <div className="col-lg-3">
      <h4 className="text-warning en mt-3">On Social</h4>
      <FacebookPage />
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
      <div className="rounded border-info mt-2">
       <h6 className="bg-warning rounded-top mb-0 px-3" style={{ padding: 10 }}>
        Tag
       </h6>
       <div className="bg-dark mt-0 rounded-bottom ps-1">
        <NavLink
         to="/home?keyword=រឿងភាគថៃ"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         ថៃ
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         ចិន
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         Drama
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         កូរេ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         ចិនបុរាណ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/sdf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
        <NavLink
         to="/dsf"
         activeClassName="bg-info"
         className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
        >
         រឿងភាគថៃ
        </NavLink>
       </div>
      </div>
      <h5 className="text-warning mt-3 en mb-2">New Movies Today</h5>
      <MovieToday />
     </div>
    </div>
   </div>
  </>
 );
};

export default HomeScreen;
