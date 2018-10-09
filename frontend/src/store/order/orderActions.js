import * as types from '../types';

import orderRepository from '../../repositories/OrderRepository';

export default {
  getById,
  getList,
  changeStatus,
};

function getById(id) {
  id = Number(id);
  return dispatch => {
    dispatch({
      type: types.ORDER_GET_BY_ID_REQUEST,
      id,
    });

    return orderRepository.getById(id).then(data => {
        if (data.success) {
          dispatch({
            type: types.ORDER_GET_BY_ID_SUCCESS,
            order: data.response.data,
          });
        }
        else if (data.errors) {
          dispatch({type: types.ORDER_GET_BY_ID_FAILURE, errors: Object.keys(data.errors)});
        }
      });
  };
}

function getList() {
  return dispatch => {
    dispatch({type: types.ORDER_GET_LIST_REQUEST});

    return orderRepository.getList().then(data => {
        if (data.success) {
          dispatch({
            type: types.ORDER_GET_LIST_SUCCESS,
            list: data.response.list,
          });
        }
        else if (data.errors) {
          dispatch({type: types.ORDER_GET_LIST_FAILURE, errors: Object.keys(data.errors)});
        }
      });
  };
}

function changeStatus(id, status) {
  return dispatch => {
    dispatch({type: types.ORDER_CHANGE_STATUS_REQUEST});

    return orderRepository.changeStatus(id, status).then(data => {
        if (data.success) {
          dispatch({
            type: types.ORDER_CHANGE_STATUS_SUCCESS,
            id,
            status,
          });
        }
        else if (data.errors) {
          dispatch({type: types.ORDER_CHANGE_STATUS_FAILURE, errors: Object.keys(data.errors)});
        }
      });
  };
}
