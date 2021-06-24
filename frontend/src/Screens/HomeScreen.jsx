import React, { useEffect, useState } from 'react';
import VideoCard from '../Components/VideoCard';
import PopularMovie from '../Components/PopularMovie';
import TypeBar from '../Components/TypeBar';
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
  console.log(keyword);
 }, [dispatch, pageNumber, keyword, word]);

 return (
  <>
   <Helmet>
    <link
     rel="icon"
     href="https://image.shutterstock.com/image-vector/outstanding-professional-elegant-trendy-awesome-600w-1247235529.jpg"
    />
    <title>មើលកម្សាន្ដ​ {keyword ? `- ${keyword}` : ''}</title>
   </Helmet>
   <div
    className="container-fluid pt-5 position-relative d-none"
    style={{ minHeight: 200, background: '#cbe8ff' }}
   >
    <div className="container">
     <div className="row">
      {/* <div className="col-6 col-md-4">
       <img
        className="rounded"
        style={{ width: 100 }}
        src="https://image.shutterstock.com/image-vector/outstanding-professional-elegant-trendy-awesome-600w-1247235529.jpg"
        alt=""
       />
      </div> */}
      {/* <div className="col-4 d-flex justify-content-center d-none d-md-block">
       <div>
        <div className="d-flex flex-wrap d-none">
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=hongmeas')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/hong.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=mytv')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/mytv.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=pnn')}
          className="m-1 shadow todayItem scale rounded"
          width="60"
          src="/uploads/videoUploads/pnn.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=ppctv')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/ppctv5.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=tv5')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/tv5.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=bayon')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/bayon.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ខ្មែរ?keyword=ctv8hd')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/ctv8hd.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ថៃ?keyword=thaitv3')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/thaitv3.jpg"
          alt=""
         />
         <img
          onClick={() => history.push('/movies/ថៃ?keyword=thaitv7')}
          className="m-1 shadow todayItem scale rounded-3"
          width="60"
          src="/uploads/videoUploads/thaitv7.jpg"
          alt=""
         />
        </div>
       </div>
      </div> */}
     </div>
    </div>
   </div>
   <div className="container position-relative" style={{ minHeight: '100vh' }}>
    <div className="row">
     <div className="col-lg-9 mx-0 px-0">
      <PopularMovie />
      <div style={{ marginTop: 10 }}></div>
      <TypeBar
       typeBar={keyword ? `ស្វែងរក​​ -​ ${keyword}` : 'រឿង'}
       barColor={'warning'}
      />
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
          <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-3 p-2">
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
     </div>
     <div className="col-lg-3">
      <div className="rounded border-info">
       <h6
        className="khFont text-light bg-warning rounded-top mb-0 px-3"
        style={{ padding: 10 }}
       >
        ថេក
       </h6>
       <div className="bg-dark mt-0 rounded-bottom">
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
      <h6 className="text-warning mt-3 mb-0">រឿងថ្មីថ្ងៃនេះ</h6>
      <MovieToday />
     </div>
    </div>
   </div>
  </>
 );
};

export default HomeScreen;
