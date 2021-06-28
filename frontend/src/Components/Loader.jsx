import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ wh = 16, color = false, mg = false }) => {
 return (
  <Spinner
   className={`${color ? color : 'text-primary'}`}
   animation="border"
   role="status"
   aria-hidden="true"
   style={{
    width: `${wh}px`,
    height: `${wh}px`,
    margin: `${mg ? mg : 'auto'}`,
    display: 'block',
   }}
  ></Spinner>
 );
};

export default Loader;
