import React from 'react';

const NotFoundScreen = () => {
 return (
  <>
   <div className="container pt-5" style={{ minHeight: '100vh' }}>
    <div className="d-flex justify-content-center mt-5">
     <img className="notFImg" src="/uploads\videoUploads\404.png" alt="" />
    </div>
    <h5 className="khFont text-center my-5 text-warning">
     មិនមានក្នុងស៊ីសស្ទឹមយើងទេ​ / Not found in our system
    </h5>
   </div>
  </>
 );
};

export default NotFoundScreen;
