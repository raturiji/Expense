import {SAVE_USER, USER_CATEGORIES, START_TUTORIAL} from '../actions/types';

const initialState = {
  userData: null,
  categories: [],
  startTutorial: true,
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
    case START_TUTORIAL:
      return {
        ...state,
        startTutorial: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
