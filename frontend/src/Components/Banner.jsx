import React from 'react';
import bannerImg from '../Image/bg3.jpg';
const Banner = () => {
 return (
  <>
   <div className="container overflow-hidden my-1" style={{ height: '100px' }}>
    <img className="w-100" src={bannerImg} alt="" />
   </div>
  </>
 );
};

export default Banner;
