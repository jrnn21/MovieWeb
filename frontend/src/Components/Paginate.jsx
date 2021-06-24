import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages = 10, page = 1, isAdmin = false, keyword = '' }) => {
 return (
  pages > 1 && (
   <Pagination>
    {[...Array(pages).keys()].map((x) => (
     <LinkContainer
      key={x + 1}
      to={
       !isAdmin
        ? keyword
          ? `/movies/search/page/${x + 1}?keyword=${keyword}`
          : `/movies/page/${x + 1}`
        : keyword
        ? `/adminPanel/movies/search/page/${x + 1}?keyword=${keyword}`
        : `/adminPanel/movies/page/${x + 1}`
      }
     >
      <Pagination.Item activeLabel="" active={x + 1 === page}>
       {x + 1}
      </Pagination.Item>
     </LinkContainer>
    ))}
   </Pagination>
  )
 );
};

export default Paginate;
