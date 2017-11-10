import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
// import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import Common from 'reducers/reduxCommon';

export default combineReducers({
  routing: routerReducer, Common
});
