import { SAVE_USER } from '../actions/types';

const initialState = {
    userData: null
};

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USER:
            return {
                ...state,
                userData:action.payload
            };
        default:
            return state;
    }
};
export default Reducer;