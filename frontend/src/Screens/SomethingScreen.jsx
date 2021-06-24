import React from 'react';
import AdminSite from '../Components/AdminSite';

const SomethingScreen = () => {
 return (
  <>
   <div className="container" style={{ minHeight: '100vh' }}>
    <h4 className="khFont text-center mt-2 text-warning">អែតមីនផាណែល</h4>
    <div className="d-flex">
     <div>
      <AdminSite />
     </div>
     <div></div>
    </div>
   </div>
  </>
 );
};

export default SomethingScreen;
