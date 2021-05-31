import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Actions/UserActions';

const LoginScreen = ({ location, history }) => {
 const [user, setUser] = useState({ email: '', password: '' });

 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;

 const redirect = location.search ? location.search.split('=')[1] : '/';

 useEffect(() => {
  if (userIn) {
   if (redirect !== '/') {
    history.push(redirect);
   }
   history.push('/adminPanel');
  }
 }, [history, userIn, redirect]);

 const emailOnChange = (e) => {
  setUser({ ...user, email: e.target.value });
 };
 const passwordOnChange = (e) => {
  setUser({ ...user, password: e.target.value });
 };
 const loginSubmit = (e) => {
  e.preventDefault();
  dispatch(login(user.email, user.password));
 };

 return (
  <>
   <div className="container">
    <div className="row">
     <div className="col-lg-3"></div>
     <div className="col-lg-6 py-5">
      <div className="w-100 card my-5 p-5 shadow rounded-3">
       <form className="align-self-center w-100" onSubmit={loginSubmit}>
        <h3 className="text-center khFont mt-2">ចូលទៅកាន់អែតមីនផាណែល</h3>
        <div className="row mb-3">
         <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          អុីម៉ែល
         </label>
         <div className="col-sm-10">
          <input
           type="email"
           className="form-control"
           id="inputEmail3"
           placeholder="ex: example@example.com"
           onChange={emailOnChange}
           required
          />
         </div>
        </div>
        <div className="row mb-3">
         <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          លេខកូដ
         </label>
         <div className="col-sm-10">
          <input
           type="password"
           className="form-control"
           id="inputPassword3"
           placeholder="ex: 1234567890"
           onChange={passwordOnChange}
           required
          />
         </div>
        </div>
        <button type="submit" className="btn btn-primary mx-auto">
         Sign in
        </button>
       </form>
      </div>
     </div>
     <div className="col-lg-3"></div>
    </div>
   </div>
  </>
 );
};

export default LoginScreen;
