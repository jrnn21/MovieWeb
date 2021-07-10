import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../Actions/UserActions';
import queryString from 'query-string';
import { BsSearch } from 'react-icons/bs';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Loader from './Loader';

const Navbar = () => {
 const history = useHistory();
 const location = useLocation();
 const dispatch = useDispatch();
 const query = queryString.parse(location.search);
 const keyword = query.keyword || '';
 const [word, setWord] = useState(keyword);

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;
 const movieList = useSelector((state) => state.movieList);
 const { loading: movieListLoading } = movieList;

 const logoutHandler = () => {
  if (window.confirm('Are you sure?')) {
   dispatch(logout());
   history.push('/');
  }
 };

 const searchOnChange = (e) => {
  setWord(e.target.value);
  history.push(`/movies/search/page/1?keyword=${e.target.value}`);
 };

 const searchSubmit = (e) => {
  e.preventDefault();
  history.push(`/movies/search/page/1?keyword=${word}`);
 };

 const goBack = () => {
  setWord('');
  history.push('/');
 };

 return (
  <>
   <div className="bg-dark p-0 m-0 sticky-top">
    <nav
     className="navbar navbar-expand-lg navbar-light"
     style={{ background: '#485864' }}
    >
     <div className="container-lg">
      <Link to={'/'} className="navbar-brand text-warning">
       DRAMA855
      </Link>
      <div className="col-6 col-md-4 d-lg-none">
       <form className="d-flex w-100" onSubmit={searchSubmit}>
        <input
         className="form-control me-2 khFont w-100 text-center bg-dark text-warning"
         type="search"
         placeholder="Movie name..."
         aria-label="Search"
         onChange={searchOnChange}
         value={word}
        />

        {movieListLoading ? (
         <button className="btn btn-warning khFont" type="submit">
          <Loader />
         </button>
        ) : keyword ? (
         <button className="btn btn-danger khFont" onClick={goBack}>
          <RiDeleteBack2Fill
           className="mb-1"
           style={{ marginLeft: 1, marginRight: 1 }}
          />
         </button>
        ) : (
         <button className="btn btn-warning khFont" type="submit">
          <BsSearch
           className="mb-1"
           style={{ marginLeft: 1, marginRight: 1 }}
          />
         </button>
        )}
       </form>
      </div>

      <button
       className="navbar-toggler text-warning"
       type="button"
       data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent"
       aria-expanded="false"
       aria-label="Toggle navigation"
      >
       <span className="navbar-toggler-icon text-warning"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ms-1">
         <NavLink
          to="/movies/khmer/page/1?keyword=khmer"
          className="nav-link rounded fs-6 navItem px-4 text-warning"
          activeClassName="bg-dark navItemColor t_warning"
         >
          KHMER
         </NavLink>
        </li>
        <li className="nav-item ms-1">
         <NavLink
          to="/movies/thai/page/1?keyword=thai"
          className="nav-link rounded fs-6 navItem px-4 text-warning"
          activeClassName="bg-dark navItemColor t_warning"
         >
          THAI
         </NavLink>
        </li>
        <li className="nav-item ms-1">
         <NavLink
          to="/movies/china/page/1?keyword=chinese"
          className="nav-link rounded fs-6 navItem px-4 text-warning"
          activeClassName="bg-dark navItemColor t_warning"
         >
          CHINESE
         </NavLink>
        </li>
        <li className="nav-item ms-1">
         <NavLink
          to="/movies/end/page/1?keyword=end"
          className="nav-link rounded fs-6 navItem px-4 text-warning"
          activeClassName="bg-dark navItemColor t_warning"
         >
          END
         </NavLink>
        </li>
       </ul>

       <div className="col-6 col-md-4 d-none d-lg-block">
        <form
         className="d-flex w-100 justify-content-end"
         onSubmit={searchSubmit}
        >
         <input
          className="form-control me-2 khFont text-center bg-dark text-warning"
          style={{ width: '65%' }}
          type="search"
          placeholder="Movie name..."
          aria-label="Search"
          onChange={searchOnChange}
          value={word}
         />
         <button type="submit" hidden>
          submit
         </button>
         {movieListLoading ? (
          <button className="btn btn-warning khFont" type="submit">
           <Loader />
          </button>
         ) : keyword ? (
          <button className="btn btn-danger khFont" onClick={goBack}>
           <RiDeleteBack2Fill
            className="mb-1"
            style={{ marginLeft: 1, marginRight: 1 }}
           />
          </button>
         ) : (
          <button className="btn btn-warning khFont" type="submit">
           <BsSearch
            className="mb-1"
            style={{ marginLeft: 1, marginRight: 1 }}
           />
          </button>
         )}
        </form>
       </div>

       {userIn && userIn.isAdmin ? (
        <NavLink
         to="/adminPanel/movies"
         className="nav-link text-warning rounded fs-6 navItem mx-1"
         activeClassName="bg-dark"
        >
         អែតមីន
        </NavLink>
       ) : null}
       {userIn && userIn.isAdmin ? (
        <button className="khFont btn btn-danger ms-1" onClick={logoutHandler}>
         ចាកចេញ
        </button>
       ) : null}
      </div>
     </div>
    </nav>
   </div>
  </>
 );
};

export default Navbar;
