import React, { useEffect, useState } from 'react';
import { IoPlaySharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
 createEpByMovieId,
 createMovie,
 deleteEpByMovieId,
 getEpByMovie,
 getMovieById,
 updateEpByMovieId,
} from '../Actions/MovieActions';
import axios from 'axios';
import {
 EP_CREATE_RESET,
 EP_LIST_RESET,
 MOVIE_DETAIL_RESET,
} from '../Constants/MovieConstants';

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
 });
 const [deletedMovie, setDeletedMovie] = useState(false);
 const [updateMovie, setUpdateMovie] = useState(false);
 const [uploading, setUploading] = useState(false);

 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userIn } = userLogin;
 const config = {
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${userIn.token}`,
  },
 };
 const movieDetail = useSelector((state) => state.movieDetail);
 const { loading: loadingMDetail, error: errorMDetail, movie } = movieDetail;
 const epByMovie = useSelector((state) => state.epByMovie);
 const { loading: epLoading, error: epError, episodes } = epByMovie;
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
   console.log(movie);
   setMovieEdit({
    ...movieEdit,
    id: movie._id,
    movieName: movie.movieName,
    movieType: movie.movieType,
    updateMovie: movie.updateMovie,
    img: movie.img,
    tag: movie.tag,
   });
  }
 }, [dispatch, movieId, movie]);

 useEffect(() => {
  dispatch({ type: EP_CREATE_RESET });
  dispatch(getEpByMovie(movieId));
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
  if (window.confirm('Are you want to delete?')) {
   async function createData() {
    try {
     setDeletedMovie(true);
     const gg = await axios.post('/api/uploads/img/delete', {
      img: movie.img,
     });
     const { data } = await axios.delete(`/api/movies/${movieId}`, config);
     if (data) {
      setDeletedMovie(false);
      history.push(`/adminPanel`);
     }
    } catch (error) {
     console.log(error);
    }
   }
   createData();
  }
 };

 const updateMovieHandler = () => {
  async function updateData() {
   try {
    setUpdateMovie(true);
    if (movie.img !== movieEdit.img) {
     const gg = await axios.post('/api/uploads/img/delete', {
      img: movie.img,
     });
    }

    const { data } = await axios.put(
     `/api/movies/${movieId}`,
     { movieEdit },
     config
    );
    if (data) {
     setUpdateMovie(false);
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

   setMovieEdit({ ...movieEdit, img: data });
   setUploading(false);
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

 return (
  <>
   <div className="container ">
    <h2 className="text-center khFont mt-2">គេហទំព័រកែសម្រួលវីឌីអូ</h2>
    <div className="row row-cols-2">
     <div className="col">
      <h4 className="khFont text-center">កែសម្រួលវិឌីអូ</h4>
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
        </div>
       </div>
       <img className="mb-2" width="40%" src={movieEdit.img} alt="" />
      </form>
     </div>
     <div className="col">
      <div>
       <h4 className="khFont text-center">កែសម្រួលភាគ</h4>
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

       <h5 className="khFont bg-dark text-light p-3 m-0 mt-2">ភាគរឿង៖</h5>
       <div className="ep mb-2">
        {episodes &&
         episodes.map((ep) => (
          <div
           className={`khFont shadow video border ${
            video.vid === ep._id ? 'bg-secondary' : 'bg-light'
           }`}
           key={ep._id}
           onClick={() => episodeEditHandler(ep)}
          >
           <IoPlaySharp className="me-2 mb-1" />
           {ep.episode}
          </div>
         ))}
       </div>
      </div>
     </div>
    </div>
    <div className="">
     <div className="d-flex justify-content-center">
      {updateMovie ? (
       <button className="btn btn-secondary" type="button" disabled>
        <span
         className="spinner-border spinner-border-sm"
         role="status"
         aria-hidden="true"
        ></span>
        Loading...
       </button>
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
       <button className="btn btn-secondary" type="button" disabled>
        <span
         className="spinner-border spinner-border-sm"
         role="status"
         aria-hidden="true"
        ></span>
        Loading...
       </button>
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
       to="/adminPanel"
       className="btn btn-dark khFont mx-1"
      >
       ត្រលប់ទៅកាន់អែតមីន
      </NavLink>
     </div>
    </div>
   </div>
  </>
 );
};

export default VideoPageEdit;
