import {combineReducers} from 'redux';

import orderReducer from './order/orderReducer';

export default combineReducers({
  order: orderReducer,
});
