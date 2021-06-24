import React, { useEffect, useState } from 'react';
import AdminSite from '../Components/AdminSite';
import axios from 'axios';
import VideoCard from '../Components/VideoCard';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const AdminSlideScreen = () => {
 const [slides, setSlides] = useState([]);

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;

 useEffect(() => {
  async function fetchData() {
   const { data } = await axios.get('/api/movies/slide/img');
   if (data) {
    setSlides(data);
   }
  }
  fetchData();
 }, []);
 if (userIn && userIn.isAdmin) {
  return (
   <>
    <div className="container" style={{ minHeight: '100vh' }}>
     <h4 className="khFont text-center mt-2 text-warning">ស្លាស្គ្រីន</h4>
     <div className="d-flex">
      <div>
       <AdminSite />
      </div>
      <div>
       <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-3 p-2">
        {slides &&
         slides.map((M) => (
          <div className="col m-0 p-1" key={M._id}>
           <VideoCard admin={true} movie={M} />
          </div>
         ))}
       </div>
      </div>
     </div>
    </div>
   </>
  );
 } else {
  return <Redirect to="/error" />;
 }
};

export default AdminSlideScreen;
