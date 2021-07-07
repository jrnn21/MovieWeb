import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 createDescByMovieId,
 deleteDescByMovieId,
 getDescByMovie,
 updateDescByMovieId,
} from '../Actions/MovieActions';
import { AiFillEdit } from 'react-icons/ai';

const Descriptions = ({ mid }) => {
 const dispatch = useDispatch();
 const [desc, setDesc] = useState({ did: '', desc: '', text: '' });

 const descByMovie = useSelector((state) => state.descByMovie);
 const { descrip } = descByMovie;
 const createDescByMovie = useSelector((state) => state.createDescByMovie);
 const { success: createSuccess } = createDescByMovie;
 const deleteDescByMovie = useSelector((state) => state.deleteDescByMovie);
 const { success: deleteSuccess } = deleteDescByMovie;
 const updateDescByMovie = useSelector((state) => state.updateDescByMovie);
 const { success: updateSuccess } = updateDescByMovie;

 useEffect(() => {
  dispatch(getDescByMovie(mid));
 }, [dispatch, mid, createSuccess, deleteSuccess, updateSuccess]);

 const textOnChange = (e) => {
  setDesc({ ...desc, text: e.target.value });
 };
 const descOnChange = (e) => {
  setDesc({ ...desc, desc: e.target.value });
 };
 const cancelDesc = () => {
  setDesc({ did: '', desc: '', text: '' });
 };
 const addDesc = (e) => {
  e.preventDefault();
  dispatch(createDescByMovieId(mid, desc));
  cancelDesc();
 };

 return (
  <div>
   <h4 className="en text-warning text-center">All Descriptions</h4>
   <div className="p-1 mt-2">
    {descrip &&
     descrip.map((d) => (
      <div key={d._id} className="mb-5">
       <h4
        className="text-warning kh"
        onClick={() => {
         setDesc({ did: d._id, desc: d.desc, text: d.text });
        }}
        style={{ cursor: 'pointer' }}
       >
        {d.desc} <AiFillEdit style={{ marginTop: '-5px' }} />
       </h4>
       <p className="kh">
        <span className="me-5"></span>
        {d.text}
       </p>
      </div>
     ))}
   </div>

   <form onSubmit={addDesc}>
    <label className="form-label">Title</label>
    <input
     value={desc.desc}
     onChange={descOnChange}
     type="text"
     className="form-control kh"
    />
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
     Text
    </label>
    <textarea
     onChange={textOnChange}
     value={desc.text}
     className="form-control khFont"
     id="floatingTextarea2"
     style={{ height: '150px' }}
    />
    <div className="mt-2">
     {desc.did ? (
      <>
       <button
        type="button"
        className="btn btn-success en me-2 shadow"
        onClick={() => {
         dispatch(updateDescByMovieId(mid, desc));
         cancelDesc();
        }}
       >
        Save
       </button>
       <button
        type="button"
        className="btn btn-danger en me-2 shadow"
        onClick={() => {
         if (window.confirm('Delete Description?')) {
          dispatch(deleteDescByMovieId(mid, desc.did));
          cancelDesc();
         }
        }}
       >
        Delete
       </button>
      </>
     ) : (
      <button type="submit" className="btn btn-success en me-2 shadow">
       Create
      </button>
     )}

     <button
      type="button"
      className="btn btn-dark en me-2 shadow"
      onClick={cancelDesc}
     >
      Cancel
     </button>
    </div>
   </form>
  </div>
 );
};

export default Descriptions;
