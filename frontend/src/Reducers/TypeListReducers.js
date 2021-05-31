import {
 TYPE_LIST_CHANGE_FAIL,
 TYPE_LIST_CHANGE_SUCCESS,
} from '../Constants/TypeListConstants';

export const typeListReducers = (state = { type: 'grid' }, action) => {
 switch (action.type) {
  case TYPE_LIST_CHANGE_SUCCESS:
   return { type: action.payload };
  case TYPE_LIST_CHANGE_FAIL:
   return { error: action.payload };
  default:
   return state;
 }
};
