import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoCard from './VideoCard';
import TypeBar from '../Components/TypeBar';

const PopularMovie = () => {
 return (
  <>
   <div className="position-relative">
    <Carousel
     additionalTransfrom={0}
     arrows={false}
     autoPlay
     autoPlaySpeed={2000}
     centerMode={false}
     className="pb-2"
     containerClass="container-with-dots"
     dotListClass=""
     draggable
     focusOnSelect={false}
     infinite
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
    >
     <img
      className="w-100"
      src="https://wallpaperaccess.com/full/2461288.jpg"
      alt=""
     />
     <img
      className="w-100"
      src="https://wallpaperaccess.com/full/2461293.jpg"
      alt=""
     />
     <img
      className="w-100"
      src="https://wallpapercave.com/wp/wp6415208.jpg"
      alt=""
     />
     <img
      className="w-100"
      src="https://wallpaperaccess.com/full/2461309.jpg"
      alt=""
     />
     <img
      className="w-100"
      src="https://wallpaperaccess.com/full/2461289.jpg"
      alt=""
     />
     <img
      className="w-100"
      src="https://wallpaperaccess.com/full/2461301.jpg"
      alt=""
     />
    </Carousel>
    <div
     className="w-100 position-absolute carasal d-flex justify-content-center"
     style={{ height: '40px', bottom: '5px' }}
    >
     <h5 className="text-warning khFont mt-3">រឿងកំពុងល្បី</h5>
    </div>
   </div>
  </>
 );
};

export default PopularMovie;
