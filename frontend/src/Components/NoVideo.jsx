import React from 'react';

const NoVideo = ({ keyword }) => {
 return (
  <>
   <div className="d-flex justify-content-center">
    <img
     className="mt-5"
     width="150"
     height="100%"
     src="/uploads\videoUploads\NoVideo.png"
     alt=""
    />
   </div>
   <h5 className="khFont text-warning text-center mb-5">
    {keyword ? (
     <>
      ពាក្យ [ <span className="text-danger">{keyword}</span> ]{' '}
     </>
    ) : (
     ''
    )}{' '}
    មិនមាននៅក្នុងរឿងភាគយើងទេ​
   </h5>
  </>
 );
};

export default NoVideo;
