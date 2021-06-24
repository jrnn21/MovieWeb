import React from 'react';
import { ImFacebook } from 'react-icons/im';
import { ImInstagram } from 'react-icons/im';
import { ImTwitter } from 'react-icons/im';

const Footer = () => {
 return (
  <>
   <div className="mt-2" style={{ background: '#e3f2fd' }}>
    <div style={{ background: '#485864' }}>
     <div className="d-flex justify-content-center pt-4 pb-2">
      <ImFacebook className="fs-4 mx-2" style={{ color: 'rgb(148,149,150)' }} />
      <ImInstagram
       className="fs-4 mx-2"
       style={{ color: 'rgb(148,149,150)' }}
      />
      <ImTwitter className="fs-4 mx-2" style={{ color: 'rgb(148,149,150)' }} />
     </div>
     <p className="text-center pb-3" style={{ color: 'rgb(148,149,150)' }}>
      site.com
     </p>
    </div>
   </div>
  </>
 );
};

export default Footer;
