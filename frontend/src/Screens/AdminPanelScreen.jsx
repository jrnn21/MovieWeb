import React, { useEffect, useState } from 'react';
import { SiOneplus } from 'react-icons/si';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import VideoCard from '../Components/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { typeList } from '../Actions/TypeListActions';
import { Redirect, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getMovies } from '../Actions/MovieActions';
import { MOVIE_LIST_RESET } from '../Constants/MovieConstants';
import axios from 'axios';
import queryString from 'query-string';
import Paginate from '../Components/Paginate';
import LoaderButton from '../Components/LoaderButton';
import AdminSite from '../Components/AdminSite';

const AdminPanelScreen = ({ match, history }) => {
 const pageNumber = match.params.pageNumber || 1;
 const location = useLocation();
 const query = queryString.parse(location.search);
 const keyword = query.keyword || '';
 let i = 1;
 const [cMovie, setCMovie] = useState(false);
 const [loadingPage, setLoadingPage] = useState(false);
 const dispatch = useDispatch();

 const typeL = useSelector((state) => state.typeList);
 const { type } = typeL;
 const movieList = useSelector((state) => state.movieList);
 const {
  loading: movieListLoading,
  error: movieListError,
  movies,
  pages,
  page,
  count,
 } = movieList;
 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;

 useEffect(() => {
  dispatch({ type: MOVIE_LIST_RESET });
  setLoadingPage(true);
  dispatch(getMovies(pageNumber, keyword));
  setLoadingPage(false);
 }, [dispatch, pageNumber, keyword]);

 const listHandler = () => {
  dispatch(typeList('list'));
 };
 const gridHandler = () => {
  dispatch(typeList('grid'));
 };

 const createMovieHandler = () => {
  async function createData() {
   try {
    setCMovie(true);
    const config = {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userIn.token}`,
     },
    };
    const { data } = await axios.post('/api/movies', {}, config);
    if (data) {
     setCMovie(false);
     history.push(`/adminPanel/movies/${data._id}/edit`);
    }
   } catch (error) {
    console.log(error);
   }
  }
  createData();
 };

 const movieDetail = (mid) => {
  history.push(`/adminPanel/movies/${mid}/edit`);
 };

 const searchOnChange = (e) => {
  history.push(`/adminPanel/movies/search/page/1?keyword=${e.target.value}`);
 };

 if (userIn && userIn.isAdmin) {
  return (
   <>
    <Helmet>
     <title className="khFont">អែតមីនផាណែល</title>
    </Helmet>
    <div className="container" style={{ minHeight: '100vh' }}>
     <h4 className="khFont text-center mt-2 text-warning">អែតមីនផាណែល</h4>
     <div className="d-flex">
      <div>
       <AdminSite />
      </div>
      <div className="w-100">
       <div className="d-flex justify-content-between">
        <select
         className="form-select khFont"
         style={{ width: '18%' }}
         aria-label="Default select example"
        >
         <option value="0">រឿងទាំងអស់</option>
         <option value="1">រឿងចិនបុរាណ</option>
         <option value="2">រឿងជប៉ុន</option>
         <option value="3">រឿងថៃ</option>
        </select>

        <div className="d-flex flex-nowrap">
         <div className="input-group me-2" style={{ width: '200px' }}>
          <span className="input-group-text" id="basic-addon1">
           <span className={movieListLoading ? 'visible' : 'invisible'}>
            <Loader />
           </span>
          </span>
          <input
           type="text"
           className="form-control"
           placeholder="ឈ្មោះ-tag"
           onChange={searchOnChange}
          />
         </div>

         <div
          className="btn-group me-1"
          role="group"
          aria-label="Basic example"
         >
          <button
           type="button"
           className={`btn btn-outline-info ${
            type === 'grid' ? 'bg-info text-dark' : null
           }`}
           onClick={gridHandler}
          >
           <BsGrid3X3Gap className="mb-1" />
          </button>
          <button
           type="button"
           className={`btn btn-outline-info ${
            type === 'list' ? 'bg-info text-dark' : null
           }`}
           onClick={listHandler}
          >
           <FaList className="mb-1" />
          </button>
         </div>
         {cMovie ? (
          <LoaderButton />
         ) : (
          <button
           className="btn btn-success khFont"
           onClick={createMovieHandler}
          >
           <SiOneplus className="mb-1 me-2" />
           បង្កើតថ្មី
          </button>
         )}
        </div>
       </div>
       <div className="mt-2">
        {type === 'list' ? (
         <table className="table text-warning">
          <thead className="table-dark">
           <tr>
            <th scope="col">លេខរៀង</th>
            <th scope="col">ឈ្មោះរឿង</th>
            <th scope="col">ប្រភេទរឿង</th>
            <th scope="col">កែសម្រួលភាគ</th>
           </tr>
          </thead>
          <tbody>
           {loadingPage ? (
            <Loader />
           ) : movieListLoading ? (
            <Loader />
           ) : movieListError ? (
            <Message variant="danger">{movieListError}</Message>
           ) : (
            movies &&
            movies.map((M) => (
             <tr
              key={M._id}
              className="videoCard"
              onClick={() => movieDetail(M._id)}
             >
              <th scope="row">{i++}</th>
              <td>{M.movieName}</td>
              <td>{M.movieType}</td>
              <td>{M.updateMovie}</td>
             </tr>
            ))
           )}
          </tbody>
         </table>
        ) : (
         <div className="">
          {loadingPage ? (
           <div className="d-flex" style={{ height: '54vh' }}>
            <Loader />
           </div>
          ) : movieListLoading ? (
           <div className="d-flex" style={{ height: '54vh' }}>
            <Loader />
           </div>
          ) : movieListError ? (
           <Message variant="danger">{movieListError}</Message>
          ) : (
           <>
            <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-3 p-2">
             {movies &&
              movies.map((M) => (
               <div className="col m-0 p-1" key={M._id}>
                <VideoCard admin={true} movie={M} />
               </div>
              ))}
            </div>
            <div className="d-flex justify-content-center">
             <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
              isAdmin={true}
             />
            </div>
           </>
          )}
         </div>
        )}
       </div>
      </div>
     </div>
    </div>
   </>
  );
 }
 return <Redirect to="/error" />;
};

export default AdminPanelScreen;
