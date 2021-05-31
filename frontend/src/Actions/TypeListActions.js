import {
 TYPE_LIST_CHANGE_FAIL,
 TYPE_LIST_CHANGE_SUCCESS,
} from '../Constants/TypeListConstants';

export const typeList =
 (type = 'grid') =>
 async (dispatch) => {
  try {
   localStorage.setItem('typeList', JSON.stringify(type));
   dispatch({ type: TYPE_LIST_CHANGE_SUCCESS, payload: type });
  } catch (error) {
   dispatch({
    type: TYPE_LIST_CHANGE_FAIL,
    payload:
     error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
   });
  }
 };
