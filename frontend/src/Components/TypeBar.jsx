import React from 'react';

const TypeBar = (props) => {
 const { typeBar, barColor } = props;
 return (
  <>
   <p className={`bg-${barColor} py-2 px-4 m-0 d-inline-block rounded-top`}>
    {typeBar}
   </p>
   <div className={`border-bottom border-${barColor} border-3 mb-1`}></div>
  </>
 );
};

export default TypeBar;
