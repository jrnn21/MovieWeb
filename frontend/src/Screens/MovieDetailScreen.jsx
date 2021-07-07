import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getEpByMovie, getMovieById } from '../Actions/MovieActions';
import { MdPlayCircleFilled } from 'react-icons/md';
import axios from 'axios';
import { MOVIE_DETAIL_SUCCESS } from '../Constants/MovieConstants';
import MovieToday from '../Components/MovieToday';
import { BiCommentDetail } from 'react-icons/bi';

const MovieDetailScreen = () => {
 const { mid } = useParams();
 const dispatch = useDispatch();
 const history = useHistory();

 const movieDetail = useSelector((state) => state.movieDetail);
 const { movie } = movieDetail;
 const epByMovie = useSelector((state) => state.epByMovie);
 const { episodes } = epByMovie;

 useEffect(() => {
  window.scroll(0, 0);
  if (!movie || mid !== movie._id) {
   dispatch(getMovieById(mid));
  }
 }, [dispatch, mid]);

 useEffect(() => {
  dispatch(getEpByMovie(mid, 'desc'));
 }, [dispatch, mid]);

 const gotoPlayScreen = async () => {
  const { data } = await axios.get(`/api/movies/${movie._id}`);
  if (data && data.episodes[0]._id) {
   dispatch({ type: MOVIE_DETAIL_SUCCESS, payload: data });
   history.push(`/movies/${movie._id}/episodes/${data.episodes[0]._id}`);
  }
 };

 return (
  <div className="container">
   <div className="position-relative overflow-hidden d-none d-md-block">
    <img
     className="w-100"
     src="/uploads/videoUploads/default-slide.jpg"
     alt=""
    />
    {movie &&
    movie.slideImg !== '/uploads/videoUploads/default-slide.jpg' &&
    movie &&
    movie.slideImg !== '' ? (
     <img
      className="w-100 position-absolute"
      style={{ top: 0, left: 0 }}
      src={movie.slideImg}
      alt=""
     />
    ) : (
     <img
      className="w-100 position-absolute"
      style={{ top: 0, left: 0 }}
      src={movie && movie.img}
      alt=""
     />
    )}
    <div
     className="w-100 h-100 position-absolute"
     style={{ top: 0, background: 'rgba(0, 0, 0, 0.404)' }}
    >
     <MdPlayCircleFilled
      className="position-absolute playIcon"
      style={{
       fontSize: '6rem',
       color: 'rgb(255, 255, 255)',
       left: 0,
       right: 0,
       marginLeft: 'auto',
       marginRight: 'auto',
       top: 0,
       bottom: 0,
       marginTop: 'auto',
       marginBottom: 'auto',
       cursor: 'pointer',
      }}
      onClick={gotoPlayScreen}
     />
    </div>
   </div>
   <div className="d-block d-md-none" style={{ marginBottom: '100px' }}>
    <img className="w-100" src={movie && movie.img} alt="" />
    <MdPlayCircleFilled
     className="position-absolute playIcon"
     style={{
      fontSize: '6rem',
      color: 'rgb(255, 255, 255)',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      top: 0,
      bottom: '20%',
      marginTop: 'auto',
      marginBottom: 'auto',
      cursor: 'pointer',
     }}
     onClick={gotoPlayScreen}
    />
    <h3 className="text-warning mt-2 text-center">
     {movie && movie.movieName}
    </h3>

    <p className="text-light mt-4 text-center">
     Episodes :{' '}
     <span className="text-dark fw-bolder px-1 rounded bg-warning">
      {movie && movie.episodes.length}
     </span>
    </p>
    <p className="kh text-info text-center">{movie && movie.movieType}</p>
    <p></p>
   </div>
   <div className="d-none d-md-block">
    <div className="d-flex">
     <div className="" style={{ width: '400px' }}>
      <div
       className="bg-dark p-1 position-relative"
       style={{ maxWidth: '170px', top: '-110px', left: '20%' }}
      >
       <img className="w-100" src={movie && movie.img} alt="" />
      </div>
     </div>
     <div className="w-100">
      <h3 className="text-warning mt-2">{movie && movie.movieName}</h3>

      <p className="text-light mt-4">
       Episodes :{' '}
       <span className="text-dark fw-bolder px-1 rounded bg-warning">
        {movie && movie.episodes.length}
       </span>
      </p>
      <p className="kh text-info">{movie && movie.movieType}</p>
     </div>
    </div>
   </div>

   <div className="row position-relative" style={{ top: '-100px' }}>
    <div className="col-md-8">
     <h4 className="ubuntu mt-3 text-warning">
      <BiCommentDetail /> Descriptions :
     </h4>
     <p className="text-light kh lh-base text-break">
      <span className="ms-5"></span> Why you always in a mood? Fuckin 'round,
      actin' brand new I ain't tryna tell you what to do, but try to play it
      cool Baby, I ain't playing by your rules Everything look better with a
      view Why you always in a mood? Fuckin 'round, actin' brand new I ain't
      tryna tell you what to do, but try to play it cool Baby, I ain't playing
      by your rules Everything look better with a view, yeahWhy you always in a
      mood? Fuckin 'round, actin' brand new I ain't tryna tell you what to do,
      but try to play it cool Baby, I ain't playing by your rules Everything
      look better with a view Why you always in a mood? Fuckin 'round, actin'
      brand new I ain't tryna tell you what to do, but try to play it cool Baby,
      I ain't playing by your rules Everything look better with a view, yeahWhy
      you always in a mood? Fuckin 'round, actin' brand new I ain't tryna tell
      you what to do, but try to play it cool Baby, I ain't playing by your
      rules Everything look better with a view Why you always in a mood? Fuckin
      'round, actin' brand new I ain't tryna tell you what to do, but try to
      play it cool Baby, I ain't playing by your rules Everything look better
      with a view, yeah
     </p>
     <h4 className="text-warning ubuntu mt-5 kh">
      <BiCommentDetail /> អត្ថបទ :
     </h4>
     <p className="text-light kh lh-base text-break">
      <span className="ms-5"></span> ហេតុអ្វីបានជាអ្នកតែងតែមានអារម្មណ៍មិនល្អ?
      ហ្វុកគីនជុំ, យីហោថ្មីរបស់ actin
      ខ្ញុំមិនព្យាយាមប្រាប់អ្នកពីអ្វីដែលត្រូវធ្វើនោះទេប៉ុន្តែព្យាយាមលេងវា
      ទារកត្រជាក់ខ្ញុំមិនត្រូវបានលេងដោយច្បាប់របស់អ្នកអ្វីគ្រប់យ៉ាងមើលទៅល្អប្រសើរជាងមុនជាមួយ
      ហេតុអ្វីបានជាអ្នកតែងតែមានអារម្មណ៍? ហ្វុកគីន 'ជុំអាលីន' ថ្មីមិនមែនខ្ញុំទេ
      សូណាប្រាប់អ្នកពីអ្វីដែលត្រូវធ្វើប៉ុន្តែព្យាយាមលេងវាឱ្យត្រជាក់ទារកខ្ញុំមិនលេងទេ
      ដោយច្បាប់របស់អ្នកអ្វីគ្រប់យ៉ាងមើលទៅល្អប្រសើរជាងមុនជាមួយនឹងទស្សនៈមួយហេតុអ្វីអ្នកតែងតែនៅក្នុង
      អារម្មណ៍? ហ្វុកគីនយីហោម៉ាកថ្មីខ្ញុំមិនត្រូវប្រាប់អ្នកពីអ្វីដែលត្រូវធ្វើទេ
      ប៉ុន្តែព្យាយាមលេងវាឱ្យត្រជាក់ទារកខ្ញុំមិនត្រូវបានលេងដោយច្បាប់របស់អ្នកអ្វីគ្រប់យ៉ាង
      មើលទៅប្រសើរជាងមុនជាមួយនឹងទស្សនៈហេតុអ្វីបានជាអ្នកតែងតែមានអារម្មណ៍? Fuckin
      'round, actin'
      ម៉ាកថ្មីខ្ញុំមិនព្យាយាមប្រាប់អ្នកពីអ្វីដែលត្រូវធ្វើទេប៉ុន្តែព្យាយាមលេងវាឱ្យត្រជាក់ទារក
      ខ្ញុំមិនលេងតាមច្បាប់របស់អ្នកទេអ្វីៗមើលទៅល្អប្រសើរជាងមុនដោយមានទស្សនៈ
      អ្នកតែងតែនៅក្នុងអារម្មណ៍មួយ? ហ្វុកគីន
      'យីងស្តាលីនម៉ាកថ្មីខ្ញុំមិនមែនជាអ្នកប្រាប់ទេ
      អ្វីដែលអ្នកត្រូវធ្វើប៉ុន្តែព្យាយាមលេងវាឱ្យត្រជាក់ទារកខ្ញុំមិនត្រូវបានលេងដោយអ្នកទេ
      ច្បាប់អ្វីគ្រប់យ៉ាងមើលទៅល្អប្រសើរជាងមុនជាមួយនឹងទស្សនៈហេតុអ្វីបានជាអ្នកតែងតែមានអារម្មណ៍?
      ហ្វុកគីន
     </p>
     <h4 className="ubuntu mt-5 text-warning">
      <BiCommentDetail /> คำอธิบาย :
     </h4>
     <p className="text-light ubuntu lh-base text-break">
      <span className="ms-5"></span> ทำไมคุณถึงมีอารมณ์อยู่เสมอ? ไอ้รอบ actin'
      ใหม่เอี่ยม ฉันไม่ได้พยายามจะบอกคุณว่าต้องทำอย่างไร แต่พยายามจะ เล่นมัน
      เจ๋ง ที่รัก ฉันไม่ได้เล่นตามกฎของคุณ ทุกอย่างดูดีขึ้น ด้วย a ดู
      ทำไมคุณถึงมีอารมณ์อยู่เสมอ? เนื้อเพลงความหมาย: ไอ้ 'รอบ actin'
      ใหม่เอี่ยมฉันไม่ได้ พยายามจะบอกคุณว่าต้องทำอย่างไร
      แต่พยายามเล่นให้เจ๋งนะที่รัก ฉันไม่ได้เล่นนะ
      ตามกฎของคุณทุกอย่างดูดีขึ้นด้วยมุมมองใช่ทำไมคุณถึงอยู่ใน อารมณ์?
      เนื้อเพลงความหมาย: ไอ้ 'รอบ actin' ใหม่เอี่ยมไม่ลองบอกคุณว่าต้องทำอย่างไร
      แต่พยายาม เล่นให้เจ๋งนะที่รัก ฉันไม่ได้เล่นตามกฎของคุณทุกอย่าง
      ดูดีขึ้นด้วยมุมมอง ทำไมคุณถึงมีอารมณ์อยู่เสมอ? Fuckin 'รอบ actin'
      ใหม่เอี่ยม ฉันไม่ได้พยายามที่จะบอกคุณว่าต้องทำอย่างไร
      แต่พยายามเล่นให้เจ๋งนะที่รัก ฉันไม่ได้เล่นตามกฎของคุณ
      ทุกอย่างดูดีขึ้นด้วยมุมมอง ใช่ทำไม คุณอยู่ในอารมณ์เสมอ? เนื้อเพลงความหมาย:
      ไอ้ 'รอบ actin' ใหม่เอี่ยมฉันไม่พยายามบอก คุณ จะทำอย่างไร
      แต่พยายาม เล่นให้เจ๋ง ที่รัก ฉันไม่ได้เล่นกับคุณ,
      กฎเกณฑ์ทุกอย่างดูดีขึ้นด้วยมุมมอง ทำไมคุณถึงมีอารมณ์อยู่เสมอ? ไอ้เหี้ย
      'รอบ actin' ใหม่เอี่ยม ฉันไม่ได้ tryna บอกคุณว่าจะทำอย่างไร แต่พยายามที่จะ
      เล่นให้เจ๋ง ที่รัก ฉันไม่ได้เล่นตามกฎของคุณ ทุกอย่างดูดีขึ้น ด้วยมุมมองใช่
     </p>
     <h4 className="text-warning">Episodes :</h4>
     <div className="ep mt-1">
      {episodes &&
       episodes.map((epi) => (
        <NavLink
         key={epi._id}
         to={`/movies/${mid}/episodes/${epi._id}`}
         className="py-2 px-3 nav-link video cateItem t_light"
         style={{ marginBottom: 1 }}
         activeClassName="bg-light t_warning"
        >
         <span className="text-warning">{movie.movieName}</span> {' - '}{' '}
         {epi.episode}
        </NavLink>
       ))}
     </div>
    </div>
    <div className="col-md-4">
     <h5 className="text-warning">New Movies Today</h5>
     <MovieToday />
    </div>
   </div>
  </div>
 );
};

export default MovieDetailScreen;
