import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import VisibilitySensor from 'react-visibility-sensor';
import { useHistory } from 'react-router';
import { MOVIE_DETAIL_SUCCESS } from '../Constants/MovieConstants';
import { useDispatch } from 'react-redux';

const PopularMovie = () => {
 const [slides, setSlides] = useState([]);
 const dispatch = useDispatch();
 const history = useHistory();
 useEffect(() => {
  async function fetchData() {
   const { data } = await axios.get('/api/movies/slide/img');
   if (data) {
    setSlides(data);
   }
  }
  fetchData();
 }, []);

 const gotoDetail = async (m) => {
  const { data } = await axios.get(`/api/movies/${m._id}`);
  if (data) {
   dispatch({ type: MOVIE_DETAIL_SUCCESS, payload: data });
   history.push(`/movies/${m._id}`);
  }
 };

 return (
  <>
   <div
    className="position-relative p-1 mb-1 w-100"
    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
   >
    <Carousel
     additionalTransfrom={0}
     arrows={false}
     autoPlay
     autoPlaySpeed={4300}
     centerMode={false}
     className=""
     containerClass="container-with-dots overflow-hidden"
     dotListClass=""
     draggable
     focusOnSelect={false}
     infinite={true}
     itemClass=""
     keyBoardControl
     minimumTouchDrag={80}
     renderButtonGroupOutside={false}
     renderDotsOutside={true}
     responsive={{
      desktop: {
       breakpoint: {
        max: 3000,
        min: 1024,
       },
       items: 1,
       partialVisibilityGutter: 40,
      },
      mobile: {
       breakpoint: {
        max: 464,
        min: 0,
       },
       items: 1,
       partialVisibilityGutter: 30,
      },
      tablet: {
       breakpoint: {
        max: 1024,
        min: 464,
       },
       items: 1,
       partialVisibilityGutter: 30,
      },
     }}
     //  showDots={true}
     sliderClass=""
     slidesToSlide={1}
     swipeable
     transitionDuration={0}
    >
     {slides.map((m) => (
      <div
       key={m._id}
       className="w-100 position-relative videoCard"
       onClick={() => gotoDetail(m)}
      >
       <img
        className="w-100"
        src={m.slideImg || '/uploads/videoUploads/default-slide.jpg'}
        alt=""
       />
       <div
        className="position-absolute w-100 py-3 px-4 carasal"
        style={{ bottom: 0, height: 50 }}
       >
        <VisibilitySensor className="w-100">
         {({ isVisible }) => (
          <div
           className={`w-100 ${
            isVisible ? 'slideAnimate visible' : 'invisible'
           }`}
          >
           <h6 className={`text-warning text-end khFont mt-1 w-100`}>
            {m.movieName}
           </h6>
          </div>
         )}
        </VisibilitySensor>
       </div>
      </div>
     ))}
    </Carousel>
   </div>
  </>
 );
};

export default PopularMovie;
