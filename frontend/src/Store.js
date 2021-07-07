import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './Reducers/UserReducers';
import { typeListReducers } from './Reducers/TypeListReducers';
import {
 createDescByMovieReducer,
 createEpByMovieReducer,
 createMovieReducer,
 deleteDescByMovieReducer,
 deleteEpByMovieReducer,
 descByMovieReducer,
 epByMovieReducer,
 movieDetailReducer,
 movieListReducer,
 updateDescByMovieReducer,
 updateEpByMovieReducer,
} from './Reducers/MovieReducers';

const reducer = combineReducers({
 userLogin: userLoginReducer,
 typeList: typeListReducers,
 movieList: movieListReducer,
 movieDetail: movieDetailReducer,
 createMovie: createMovieReducer,
 epByMovie: epByMovieReducer,
 createEpByMovie: createEpByMovieReducer,
 updateEpByMovie: updateEpByMovieReducer,
 deleteEpByMovie: deleteEpByMovieReducer,
 descByMovie: descByMovieReducer,
 createDescByMovie: createDescByMovieReducer,
 updateDescByMovie: updateDescByMovieReducer,
 deleteDescByMovie: deleteDescByMovieReducer,
});

const userInfoFromStorage = localStorage.getItem('userIn')
 ? JSON.parse(localStorage.getItem('userIn'))
 : null;
const typeListFromStorage = localStorage.getItem('typeList')
 ? JSON.parse(localStorage.getItem('typeList'))
 : 'grid';

const initialState = {
 userLogin: { userIn: userInfoFromStorage },
 typeList: { type: typeListFromStorage },
};
const middleware = [thunk];

const store = createStore(
 reducer,
 initialState,
 composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
