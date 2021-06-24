import React from 'react';

const LoaderButton = () => {
 return (
  <>
   <button className="btn btn-secondary khFont" type="button" disabled>
    <span
     className="spinner-border spinner-border-sm me-1"
     role="status"
     aria-hidden="true"
    ></span>
    កំពុងដំណើរការ...
   </button>
  </>
 );
};

export default LoaderButton;
