import React, { useEffect } from 'react';
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

const HomeScreen = ({ match, history }) => {
 const pageNumber = match.params.pageNumber || 1;
 const location = useLocation();
 const query = queryString.parse(location.search);
 const keyword = query.keyword || '';

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
 }, [dispatch, pageNumber, keyword]);
 return (
  <>
   <div className="container">
    <div className="row">
     <div className="col-lg-9">
      <PopularMovie />
      <TypeBar
       typeBar={keyword ? `ស្វែងរក​​ -​ ${keyword}` : 'រឿង'}
       barColor={'info'}
      />
      {movieListLoading ? (
       <div className="mt-2" style={{ height: '30vh' }}>
        <Loader />
       </div>
      ) : movieListError ? (
       <Message variant="danger">{movieListError}</Message>
      ) : (
       <>
        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-2 p-2">
         {movies &&
          movies.map((movie) => (
           <div className="col m-0 p-1" key={movie._id}>
            <VideoCard movie={movie} />
           </div>
          ))}
        </div>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
       </>
      )}
     </div>
     <div className="col-lg-3 mt-1">
      <TypeBar typeBar={'ប្រភេទរឿង'} barColor={'secondary'} />
      <div className="rounded p-1 bg-dark">
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
       <NavLink
        to="/sdf"
        activeClassName="bg-info"
        className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
       >
        រឿងភាគថៃ
       </NavLink>
       <NavLink
        to="/df"
        activeClassName="bg-info"
        className="btn cateItem khFont rounded px-3 mb-1 me-1 d-inline-block"
       >
        រឿងភាគថៃ
       </NavLink>
       <NavLink
        to="/ds"
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
    </div>
   </div>
  </>
 );
};

export default HomeScreen;
