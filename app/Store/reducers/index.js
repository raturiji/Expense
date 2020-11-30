import {SAVE_USER, USER_CATEGORIES} from '../actions/types';

const initialState = {
  userData: null,
  categories: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
