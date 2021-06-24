import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MOVIE_LIST_RESET } from '../Constants/MovieConstants';

const AdminSite = () => {
 const dispatch = useDispatch();
 return (
  <>
   <div
    className="me-2 d-none d-lg-block rounded-3 overflow-hidden border-dark border"
    style={{ minWidth: '270px' }}
   >
    <NavLink
     onClick={() => dispatch({ type: MOVIE_LIST_RESET })}
     to={'/adminPanel/movies'}
     className="nav-link khFont text-warning navItem ps-4 border-dark border-bottom border-dark"
     activeClassName="bg-dark"
    >
     រឿងទាំងអស់
    </NavLink>
    <NavLink
     to={'/adminPanel/slider'}
     className="nav-link khFont text-warning navItem ps-4 border-dark"
     activeClassName="bg-dark"
    >
     ស្លាយ
    </NavLink>
   </div>
  </>
 );
};

export default AdminSite;
