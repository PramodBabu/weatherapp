import { combineReducers } from 'redux';
import { weatherReducer } from './weatherReducer'

export const RootReducer = combineReducers({
    weather: weatherReducer
});

export default RootReducer;