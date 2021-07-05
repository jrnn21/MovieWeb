import axios from 'axios';
import {
 EP_CREATE_FAIL,
 EP_CREATE_REQUEST,
 EP_CREATE_SUCCESS,
 EP_LIST_FAIL,
 EP_LIST_REQUEST,
 EP_LIST_SUCCESS,
 MOVIE_CREATE_FAIL,
 MOVIE_CREATE_REQUEST,
 MOVIE_CREATE_SUCCESS,
 MOVIE_DETAIL_FAIL,
 MOVIE_DETAIL_REQUEST,
 MOVIE_DETAIL_SUCCESS,
 MOVIE_LIST_FAIL,
 MOVIE_LIST_REQUEST,
 MOVIE_LIST_SUCCESS,
 EP_UPDATE_FAIL,
 EP_UPDATE_REQUEST,
 EP_UPDATE_SUCCESS,
 EP_DELETE_REQUEST,
 EP_DELETE_SUCCESS,
 EP_DELETE_FAIL,
} from '../Constants/MovieConstants';

export const getMovies = (pageNumber, keyword) => async (dispatch) => {
 try {
  dispatch({ type: MOVIE_LIST_REQUEST });
  const { data } = await axios.get(
   `/api/movies?pageNumber=${pageNumber}&keyword=${keyword}`
  );
  dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: MOVIE_LIST_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const getMovieById = (movieId) => async (dispatch) => {
 try {
  //   dispatch({ type: MOVIE_DETAIL_REQUEST });
  const { data } = await axios.get(`/api/movies/${movieId}`);
  dispatch({ type: MOVIE_DETAIL_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: MOVIE_DETAIL_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const createMovie = () => async (dispatch, getState) => {
 try {
  dispatch({ type: MOVIE_CREATE_REQUEST });
  const {
   userLogin: { userIn },
  } = getState();

  const config = {
   headers: {
    Authorization: `Bearer ${userIn.token}`,
   },
  };
  const { data } = await axios.post(`/api/movies`, { name: 'gg' }, config);
  dispatch({ type: MOVIE_CREATE_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: MOVIE_CREATE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const getEpByMovie = (mid, sssss) => async (dispatch) => {
 try {
  //   dispatch({ type: EP_LIST_REQUEST });
  const { data } = await axios.get(`/api/movies/${mid}/episodes?sort=${sssss}`);
  dispatch({ type: EP_LIST_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: EP_LIST_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message,
  });
 }
};

export const createEpByMovieId =
 (mid, epCreate) => async (dispatch, getState) => {
  try {
   dispatch({ type: EP_CREATE_REQUEST });
   const {
    userLogin: { userIn },
   } = getState();
   const config = {
    headers: {
     Authorization: `Bearer ${userIn.token}`,
    },
   };
   const { data } = await axios.post(
    `/api/movies/${mid}/episodes`,
    { epCreate },
    config
   );
   dispatch({ type: EP_CREATE_SUCCESS, payload: data });
  } catch (error) {
   dispatch({
    type: EP_CREATE_FAIL,
    payload:
     error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
   });
  }
 };

export const updateEpByMovieId =
 (mid, epUpdate) => async (dispatch, getState) => {
  try {
   dispatch({ type: EP_UPDATE_REQUEST });
   const {
    userLogin: { userIn },
   } = getState();
   const config = {
    headers: {
     Authorization: `Bearer ${userIn.token}`,
    },
   };
   const { data } = await axios.put(
    `/api/movies/${mid}/episodes/${epUpdate.vid}`,
    { epUpdate },
    config
   );
   dispatch({ type: EP_UPDATE_SUCCESS, payload: data });
  } catch (error) {
   dispatch({
    type: EP_UPDATE_FAIL,
    payload:
     error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
   });
  }
 };

export const deleteEpByMovieId =
 (mid, epUpdate) => async (dispatch, getState) => {
  try {
   dispatch({ type: EP_DELETE_REQUEST });
   const {
    userLogin: { userIn },
   } = getState();
   const config = {
    headers: {
     Authorization: `Bearer ${userIn.token}`,
    },
   };
   const { data } = await axios.delete(
    `/api/movies/${mid}/episodes/${epUpdate.vid}`,
    config
   );
   dispatch({ type: EP_DELETE_SUCCESS, payload: data });
  } catch (error) {
   dispatch({
    type: EP_DELETE_FAIL,
    payload:
     error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
   });
  }
 };
