import {
 EP_CREATE_FAIL,
 EP_CREATE_REQUEST,
 EP_CREATE_RESET,
 EP_CREATE_SUCCESS,
 EP_DELETE_FAIL,
 EP_DELETE_REQUEST,
 EP_DELETE_RESET,
 EP_DELETE_SUCCESS,
 EP_LIST_FAIL,
 EP_LIST_REQUEST,
 EP_LIST_RESET,
 EP_LIST_SUCCESS,
 EP_UPDATE_FAIL,
 EP_UPDATE_REQUEST,
 EP_UPDATE_RESET,
 EP_UPDATE_SUCCESS,
 MOVIE_CREATE_FAIL,
 MOVIE_CREATE_REQUEST,
 MOVIE_CREATE_RESET,
 MOVIE_CREATE_SUCCESS,
 MOVIE_DETAIL_FAIL,
 MOVIE_DETAIL_REQUEST,
 MOVIE_DETAIL_RESET,
 MOVIE_DETAIL_SUCCESS,
 MOVIE_LIST_FAIL,
 MOVIE_LIST_REQUEST,
 MOVIE_LIST_RESET,
 MOVIE_LIST_SUCCESS,
} from '../Constants/MovieConstants';

export const movieListReducer = (state = {}, action) => {
 switch (action.type) {
  case MOVIE_LIST_REQUEST:
   return { loading: true };
  case MOVIE_LIST_SUCCESS:
   return {
    loading: false,
    movies: action.payload.movies,
    page: action.payload.page,
    pages: action.payload.pages,
    count: action.payload.count,
   };
  case MOVIE_LIST_FAIL:
   return { loading: false, error: action.payload };
  case MOVIE_LIST_RESET:
   return {};
  default:
   return state;
 }
};

export const movieDetailReducer = (state = {}, action) => {
 switch (action.type) {
  case MOVIE_DETAIL_REQUEST:
   return { loading: true };
  case MOVIE_DETAIL_SUCCESS:
   return { loading: false, movie: action.payload };
  case MOVIE_DETAIL_FAIL:
   return { loading: false, error: action.payload };
  case MOVIE_DETAIL_RESET:
   return {};
  default:
   return state;
 }
};

export const createMovieReducer = (state = {}, action) => {
 switch (action.type) {
  case MOVIE_CREATE_REQUEST:
   return { loading: true };
  case MOVIE_CREATE_SUCCESS:
   return { loading: false, movie: action.payload, success: true };
  case MOVIE_CREATE_FAIL:
   return { loading: false, error: action.payload };
  case MOVIE_CREATE_RESET:
   return {};
  default:
   return state;
 }
};

export const epByMovieReducer = (state = {}, action) => {
 switch (action.type) {
  case EP_LIST_REQUEST:
   return { loading: true };
  case EP_LIST_SUCCESS:
   return { loading: false, episodes: action.payload, success: true };
  case EP_LIST_FAIL:
   return { loading: false, error: action.payload };
  case EP_LIST_RESET:
   return {};
  default:
   return state;
 }
};

export const createEpByMovieReducer = (state = {}, action) => {
 switch (action.type) {
  case EP_CREATE_REQUEST:
   return { loading: true };
  case EP_CREATE_SUCCESS:
   return { loading: false, episode: action.payload, success: true };
  case EP_CREATE_FAIL:
   return { loading: false, error: action.payload };
  case EP_CREATE_RESET:
   return {};
  default:
   return state;
 }
};
export const updateEpByMovieReducer = (state = {}, action) => {
 switch (action.type) {
  case EP_UPDATE_REQUEST:
   return { loading: true };
  case EP_UPDATE_SUCCESS:
   return { loading: false, episode: action.payload, success: true };
  case EP_UPDATE_FAIL:
   return { loading: false, error: action.payload };
  case EP_UPDATE_RESET:
   return {};
  default:
   return state;
 }
};

export const deleteEpByMovieReducer = (state = {}, action) => {
 switch (action.type) {
  case EP_DELETE_REQUEST:
   return { loading: true };
  case EP_DELETE_SUCCESS:
   return { loading: false, episodes: action.payload, success: true };
  case EP_DELETE_FAIL:
   return { loading: false, error: action.payload };
  case EP_DELETE_RESET:
   return {};
  default:
   return state;
 }
};
