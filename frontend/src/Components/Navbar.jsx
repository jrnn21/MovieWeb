import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../Actions/UserActions';

const Navbar = () => {
 const history = useHistory();
 const [keyword, setKeyword] = useState('');
 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;

 const logoutHandler = () => {
  if (window.confirm('Are you sure?')) {
   dispatch(logout());
  }
 };

 const searchOnChange = (e) => {
  setKeyword(e.target.value);
  history.push(`/home/movies/search/page/1?keyword=${e.target.value}`);
 };

 const searchSubmit = () => {
  history.push(`/home/movies/search/page/1?keyword=${keyword}`);
 };

 return (
  <>
   <div className="bg-dark p-0 m-0 sticky-top">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     <div className="container">
      <Link to={'/'} className="navbar-brand">
       មើលកម្សាន្ដ
      </Link>
      <button
       className="navbar-toggler"
       type="button"
       data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent"
       aria-expanded="false"
       aria-label="Toggle navigation"
      >
       <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ms-1">
         <NavLink
          to={`/`}
          exact={true}
          className="nav-link rounded fs-6 navItem px-4"
          activeClassName="bg-light navItemColor t_warning"
         >
          ផេកដើម
         </NavLink>
        </li>
        <li className="nav-item ms-1">
         <NavLink
          to="/somethingScreen"
          className="nav-link rounded fs-6 navItem px-4"
          activeClassName="bg-light navItemColor t_warning"
         >
          ផ្សេងៗ
         </NavLink>
        </li>
        <li className="nav-item dropdown">
         <a
          className="nav-link dropdown-toggle khFont text-light"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
         >
          ប្រភេទរឿង
         </a>
         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
           <a className="dropdown-item" href="#">
            រឿងថៃ
           </a>
          </li>
          <li>
           <a className="dropdown-item" href="#">
            រឿងចិន
           </a>
          </li>
          <li>
           <hr className="dropdown-divider" />
          </li>
          <li>
           <a className="dropdown-item" href="#">
            Something else here
           </a>
          </li>
         </ul>
        </li>
       </ul>

       {userIn ? (
        <NavLink
         to="/adminPanel"
         className="nav-link rounded fs-6 navItem mx-1"
         activeClassName="bg-danger"
        >
         អែតមីន
        </NavLink>
       ) : null}
       <form className="d-flex" onSubmit={searchSubmit}>
        <input
         className="form-control me-2 khFont"
         type="search"
         placeholder="Search"
         aria-label="Search"
         onChange={searchOnChange}
        />
        <button className="btn btn-info khFont" type="submit">
         ស្វែងរក
        </button>
       </form>
       {userIn ? (
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
