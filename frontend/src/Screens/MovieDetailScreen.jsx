import React from 'react';

const MovieDetailScreen = () => {
 return (
  <div className="container">
   <div className="position-relative">
    <img
     className="w-100"
     src="/uploads\videoUploads\default-slide.jpg"
     alt=""
    />
    <div className="d-flex">
     <div className="d-lg-block d-none" style={{ width: '400px' }}>
      <div
       className="bg-light p-1 rounded position-relative"
       style={{ maxWidth: '200px', top: '-130px', left: '90px' }}
      >
       <img
        className="w-100"
        src="/uploads\videoUploads\default-image.jpg"
        alt=""
       />
      </div>
     </div>
     <div className="w-100">
      <h2 className="text-light text-center text-lg-start mt-2">
       fdfdsfsdfsdfsdf
      </h2>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MovieDetailScreen;
