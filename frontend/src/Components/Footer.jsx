import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { ImTwitter } from 'react-icons/im';

const Footer = () => {
 return (
  <div className="w-100">
   <div className="mt-5 container">
    <div
     style={{ padding: '50px 0 40px 0' }}
     className="d-flex justify-content-center"
    >
     <a
      target="_blank"
      href="https://www.facebook.com/Drama855-107840864891869"
     >
      <FaFacebookSquare
       className="instagram p-1"
       style={{ fontSize: '40px', color: 'rgb(72,103,170)' }}
       data-bs-toggle="tooltip"
       data-bs-placement="left"
       title="facebook"
      />
     </a>
     <a
      target="_blank"
      style={{ margin: '0 100px' }}
      href="https://www.instagram.com/"
     >
      <FaInstagram
       className="instagram p-1"
       style={{
        fontSize: '40px',
        color: 'rgb(242,58,82)',
       }}
       data-bs-toggle="tooltip"
       data-bs-placement="left"
       title="instagram"
      />
     </a>

     <a
      target="_blank"
      style={{ marginRight: '100px' }}
      href="https://twitter.com"
     >
      <ImTwitter
       className="instagram p-1"
       style={{
        fontSize: '40px',
        color: 'rgb(93,169,221)',
       }}
       data-bs-toggle="tooltip"
       data-bs-placement="left"
       title="twitter"
      />
     </a>

     <a
      target="_blank"
      href="https://www.youtube.com/channel/UCMiWt-Nr1OjxPydeQDhHHIg"
     >
      <FaYoutube
       className="instagram p-1"
       style={{ fontSize: '40px', color: 'rgb(255,0,0)' }}
       data-bs-toggle="tooltip"
       data-bs-placement="left"
       title="youtube"
      />
     </a>
    </div>
    <p className="text-warning text-center">
     <a href="https://www.drama855.com">www.drama855.com</a> was created for
     watching new Daily movies.
    </p>
    <p className="text-warning text-center">
     Develop by <span className="text-info">Jrnn21</span>
    </p>
    <p className="text-center pb-3 text-light">
     &copy; copyright{' '}
     <a
      href="drama855.com"
      className="text-warning"
      style={{ color: 'rgb(148,149,150)' }}
     >
      www.drama855.com
     </a>{' '}
    </p>
   </div>
  </div>
 );
};

export default Footer;
