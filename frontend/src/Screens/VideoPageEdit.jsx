import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {
 createEpByMovieId,
 deleteEpByMovieId,
 getEpByMovie,
 getMovieById,
 updateEpByMovieId,
} from '../Actions/MovieActions';
import axios from 'axios';
import {
 EP_CREATE_RESET,
 MOVIE_DETAIL_RESET,
} from '../Constants/MovieConstants';
import LoaderButton from '../Components/LoaderButton';
import AdminSite from '../Components/AdminSite';
import Descriptions from '../Components/Descriptions';

const VideoPageEdit = ({ match, history }) => {
 const movieId = match.params.mid;
 const [video, setVideo] = useState({ vid: 0, name: '', url: '' });
 const [movieEdit, setMovieEdit] = useState({
  id: '',
  movieName: '',
  movieType: '',
  updateMovie: '',
  img: '',
  tag: '',
  slideImg: '',
  toggleSlide: false,
 });
 const [deletedMovie, setDeletedMovie] = useState(false);
 const [updateMovie, setUpdateMovie] = useState(false);
 const [uploading, setUploading] = useState(false);

 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;
 const movieDetail = useSelector((state) => state.movieDetail);
 const { movie } = movieDetail;
 console.log(movie);
 const epByMovie = useSelector((state) => state.epByMovie);
 const { episodes } = epByMovie;
 const createEpByMovie = useSelector((state) => state.createEpByMovie);
 const { success: createEpSuccess } = createEpByMovie;
 const updateEpByMovie = useSelector((state) => state.updateEpByMovie);
 const { success: updateEpSuccess } = updateEpByMovie;
 const deleteEpByMovie = useSelector((state) => state.deleteEpByMovie);
 const { success: deleteEpSuccess } = deleteEpByMovie;

 useEffect(() => {
  if (!movie || movie._id !== movieId) {
   dispatch(getMovieById(movieId));
  } else {
   setMovieEdit({
    ...movieEdit,
    id: movie._id,
    movieName: movie.movieName,
    movieType: movie.movieType,
    updateMovie: movie.updateMovie,
    img: movie.img,
    tag: movie.tag,
    slideImg: movie.slideImg || '',
    toggleSlide: movie.toggleSlide || false,
   });
  }
 }, [dispatch, movieId, movie]);

 useEffect(() => {
  dispatch({ type: EP_CREATE_RESET });
  dispatch(getEpByMovie(movieId, 'desc'));
 }, [dispatch, movieId, createEpSuccess, updateEpSuccess, deleteEpSuccess]);

 //  onchange
 const movieNameOnChange = (e) => {
  setMovieEdit({ ...movieEdit, movieName: e.target.value });
 };
 const movieTypeOnChange = (e) => {
  setMovieEdit({ ...movieEdit, movieType: e.target.value });
 };
 const movieUpdateOnChange = (e) => {
  setMovieEdit({ ...movieEdit, updateMovie: e.target.value });
 };
 const movieTagOnChange = (e) => {
  setMovieEdit({ ...movieEdit, tag: e.target.value });
 };

 // functions

 const videoLinkHandler = (e) => {
  setVideo({ ...video, url: e.target.value });
 };
 const videoEpHandler = (e) => {
  setVideo({ ...video, name: e.target.value });
 };
 const resetVideo = () => {
  setVideo({ vid: 0, name: '', url: '' });
 };

 const episodeEditHandler = (ep) => {
  resetVideo();
  setVideo({ vid: ep._id, name: ep.episode, url: ep.videoUrl });
 };

 const deleteMovieHandler = () => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userIn.token}`,
   },
  };
  if (window.confirm('Are you want to delete?')) {
   async function deleteData() {
    try {
     setDeletedMovie(true);
     //  await axios.post('/api/uploads/img/delete', {
     //   img: movie.img,
     //  });
     await axios.post('/api/uploads/img/delete/slide', {
      slideImg: movie.slideImg,
     });
     const { data } = await axios.delete(`/api/movies/${movieId}`, config);
     if (data) {
      setDeletedMovie(false);
      history.push(`/adminPanel/movies`);
     }
    } catch (error) {
     console.log(error);
    }
   }
   deleteData();
  }
 };

 const updateMovieHandler = () => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userIn.token}`,
   },
  };
  async function updateData() {
   try {
    setUpdateMovie(true);

    const { data } = await axios.put(
     `/api/movies/${movieId}`,
     { movieEdit },
     config
    );
    if (data) {
     setUpdateMovie(false);
     dispatch({ type: MOVIE_DETAIL_RESET });
     history.push('/adminPanel/movies');
    }
   } catch (error) {
    console.log(error);
   }
  }
  updateData();
 };

 const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);
  setUploading(true);

  try {
   const config = {
    headers: {
     'Content-Type': 'multipart/form-data',
     Authorization: `Bearer ${userIn.token}`,
    },
   };

   const { data } = await axios.post('/api/uploads/img', formData, config);

   if (data) {
    const config = {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userIn.token}`,
     },
    };
    // await axios.post('/api/uploads/img/delete', {
    //  img: movieEdit.img,
    //  config,
    // });

    await axios.put(`/api/img/${movieId}/`, { img: data }, config);

    setMovieEdit({ ...movieEdit, img: data });
    setUploading(false);
   }
  } catch (error) {
   console.error(error);
   setUploading(false);
  }
 };

 const uploadSlideHandler = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);
  setUploading(true);

  try {
   const config = {
    headers: {
     'Content-Type': 'multipart/form-data',
     Authorization: `Bearer ${userIn.token}`,
    },
   };

   await axios.post('/api/uploads/img/delete/slide', {
    slideImg: movieEdit.slideImg,
   });

   const { data } = await axios.post('/api/uploads/img', formData, config);
   if (data) {
    const config = {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userIn.token}`,
     },
    };
    await axios.put(`/api/img/${movieId}/slide`, { slideImg: data }, config);

    setMovieEdit({ ...movieEdit, slideImg: data });
    setUploading(false);
   }
  } catch (error) {
   console.error(error);
   setUploading(false);
  }
 };

 const epSubmitHandler = (e) => {
  e.preventDefault();
  if (video.vid === 0) {
   dispatch(createEpByMovieId(movieId, video));
   resetVideo();
  } else {
   dispatch(updateEpByMovieId(movieId, video));
   resetVideo();
  }
 };

 const deleteEpHandler = () => {
  dispatch(deleteEpByMovieId(movieId, video));
  resetVideo();
 };

 const slideToggle = async () => {
  // e.preventDefault();
  const config = {
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userIn.token}`,
   },
  };

  const { data } = await axios.put(
   `/api/movies/slide/toggle/${movieId}`,
   {
    toggle: !movieEdit.toggleSlide,
   },
   config
  );
  if (data) {
   setMovieEdit({ ...movieEdit, toggleSlide: data.toggle });
  }
 };

 if (userIn && userIn.isAdmin) {
  return (
   <>
    <div className="container text-light" style={{ minHeight: '100vh' }}>
     <h4 className="text-center text-warning khFont mt-2">
      គេហទំព័រកែសម្រួលវីឌីអូ
     </h4>
     <div className="d-flex">
      <div>
       <AdminSite />
      </div>
      <div className="w-100">
       <div className="row row-cols-2">
        <div className="col">
         <form className="align-self-center w-100">
          <div className="row mb-3">
           <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            ឈ្មោះរឿង
           </label>
           <div className="col-sm-10">
            <input
             type="text"
             className="form-control khFont"
             id="inputEmail3"
             name="movieName"
             defaultValue={movieEdit.movieName}
             onChange={movieNameOnChange}
             required
            />
           </div>
          </div>
          <div className="row mb-3">
           <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            ប្រភេទរឿង
           </label>
           <div className="col-sm-10">
            <select
             className="form-select w-25 khFont"
             aria-label="Default select example"
             name="movieType"
             value={movieEdit.movieType}
             onChange={movieTypeOnChange}
            >
             <option value="រឿងចិនបុរាណ">រឿងចិនបុរាណ</option>
             <option value="រឿងភាគជប៉ុន">រឿងភាគជប៉ុន</option>
             <option value="រឿងភាគថៃ">រឿងភាគថៃ</option>
            </select>
           </div>
          </div>
          <div className="row mb-3">
           <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            រឿង
           </label>
           <div className="col-sm-10 d-flex">
            <select
             className="form-select w-25 khFont me-2"
             aria-label="Default select example"
             value={movieEdit.updateMovie}
             onChange={movieUpdateOnChange}
            >
             <option value="ថ្មី">ថ្មី</option>
             <option value="មានភាគត">មានភាគត</option>
             <option value="ចប់">ចប់</option>
             <option value="មិនដាក់">មិនដាក់</option>
            </select>
            <input
             className="form-control w-25 khFont"
             type="text"
             value={movieEdit.updateMovie}
             onChange={movieUpdateOnChange}
            />
           </div>
          </div>

          <div className="row mb-3">
           <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            ថេក(tag)
           </label>
           <div className="col-sm-10">
            <textarea
             className="form-control khFont"
             id="floatingTextarea2"
             style={{ height: '100px' }}
             onChange={movieTagOnChange}
             value={movieEdit.tag}
            />
           </div>
          </div>
          <div className="row mb-3">
           <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            រូបស្លាយ
           </label>
           <div className="col-sm-10">
            {movieEdit.slideImg === '' ||
            movieEdit.slideImg ===
             '/uploads/videoUploads/default-slide.jpg' ? null : (
             <img className="w-100 mb-2" src={movieEdit.slideImg} alt="" />
            )}

            <div className="d-flex">
             <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={uploadSlideHandler}
             />

             <button
              type="button"
              onClick={slideToggle}
              className="btn btn-danger khFont ms-2"
              style={{ width: 80 }}
             >
              {movieEdit.toggleSlide ? 'មិនដាក់' : 'ដាក់'}
             </button>
            </div>
           </div>
          </div>
          <div className="row mb-3">
           <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            លីងរូបភាព
           </label>
           <div className="col-sm-10">
            <input
             type="text"
             className="form-control khFont"
             id="inputEmail3"
             required
             defaultValue={movieEdit.img}
             readOnly
            />
           </div>
          </div>
          <div className="row mb-3">
           <label
            htmlFor="inputEmail3"
            className="col-sm-2 col-form-label"
           ></label>
           <div className="col-sm-10">
            <input
             className="form-control"
             type="file"
             id="formFile"
             onChange={uploadFileHandler}
            />
            <img className="my-2" width="40%" src={movieEdit.img} alt="" />
           </div>
          </div>
         </form>
        </div>
        <div className="col">
         <div>
          <form className="align-self-center w-100" onSubmit={epSubmitHandler}>
           <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
             ភាគទី
            </label>
            <div className="col-sm-10">
             <input
              type="text"
              className="form-control khFont"
              onChange={videoEpHandler}
              value={video.name}
              required
             />
            </div>
           </div>
           <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
             លីងវីឌីអូ
            </label>
            <div className="col-sm-10">
             <input
              type="text"
              className="form-control khFont"
              onChange={videoLinkHandler}
              value={video.url}
              required
             />
            </div>
           </div>

           <div className="d-flex justify-content-end">
            {video.vid === 0 ? (
             <button type="submit" className="btn btn-success me-2 khFont">
              បន្ថែមវីឌីអូថ្មី
             </button>
            ) : (
             <>
              <button type="submit" className="btn btn-warning me-2 khFont">
               កែប្រែវីឌីអូ
              </button>
              <button
               type="button"
               className="btn btn-danger me-2 khFont"
               onClick={deleteEpHandler}
              >
               លុបវីឌីអូ
              </button>
             </>
            )}

            <button
             type="button"
             className="btn btn-secondary khFont"
             onClick={resetVideo}
            >
             បោះបង់
            </button>
           </div>
          </form>

          <div className="rounded border border-dark mt-2">
           <h6 className="khFont bg-dark text-light p-3 m-0">ភាគរឿង៖</h6>
           <div
            className="w-100"
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
           >
            {episodes &&
             episodes.map((ep) => (
              <div
               key={ep._id}
               className={`nav-link khFont text-warning navItem ps-4 border-dark border-bottom border-dark ${
                video.vid === ep._id ? 'bg-dark' : ''
               }`}
               onClick={() => episodeEditHandler(ep)}
              >
               {ep.episode}
              </div>
             ))}
           </div>
          </div>
         </div>
        </div>
       </div>
       <div>
        <Descriptions mid={movieId} />
       </div>
       <div className="mt-3">
        <div className="d-flex justify-content-center">
         {updateMovie ? (
          <LoaderButton />
         ) : (
          <button
           type="submit"
           className="btn btn-success mx-1 khFont"
           onClick={updateMovieHandler}
          >
           រក្សាទុក
          </button>
         )}
         {deletedMovie ? (
          <LoaderButton />
         ) : (
          <button
           onClick={deleteMovieHandler}
           className="btn btn-danger khFont mx-1"
          >
           លុបរឿង
          </button>
         )}
         <NavLink
          onClick={() => dispatch({ type: MOVIE_DETAIL_RESET })}
          to="/adminPanel/movies"
          className="btn btn-dark khFont mx-1"
         >
          ត្រលប់ទៅកាន់អែតមីន
         </NavLink>
        </div>
       </div>
      </div>
     </div>
    </div>
   </>
  );
 } else {
  return <Redirect to="/error" />;
 }
};

export default VideoPageEdit;
