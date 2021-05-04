import { combineReducers } from 'redux';

import presetReducer from './presetReducer';

const rootReducer = combineReducers({
  preset: presetReducer,
});

export default rootReducer;
