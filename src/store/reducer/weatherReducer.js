import * as actionTypes from '../actionTypes';

export const weatherReducer = (state = null, action) => {
    // console.log(action.payload)
    switch(action.type) {
        case actionTypes.FETCH_WEATHER:
            return action.payload;
        default:
            return state;
    }   
}