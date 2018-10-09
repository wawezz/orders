import * as types from '../types';

const initialState = {
  isRequesting: false,
  isListRequesting: false,
  order: null,
  orderProducts: null,
  list: null,
  errors: [],

  selectedId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //region Get By Id
    case types.ORDER_GET_BY_ID_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        selectedId: action.id,
      };
    }
    case types.ORDER_GET_BY_ID_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        order: action.order,
        orderProducts: action.order.products,
      };
    }
    case types.ORDER_GET_BY_ID_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        errors: action.errors,
      };
    }
    //endregion

    //region Get List
    case types.ORDER_GET_LIST_REQUEST: {
      return {
        ...state,
        isListRequesting: true,
      };
    }
    case types.ORDER_GET_LIST_SUCCESS: {
      return {
        ...state,
        isListRequesting: false,
        list: action.list,
      };
    }
    case types.ORDER_GET_LIST_FAILURE: {
      return {
        ...state,
        isListRequesting: false,
        errors: action.errors,
      };
    }
    //endregion

    //region Change Status
    case types.ORDER_CHANGE_STATUS_REQUEST: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    case types.ORDER_CHANGE_STATUS_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        list: state.list.map(order => {
          return {
            ...order,
            status: order.id === action.id ? action.status : order.status,
          }
        }),
        order: state.order.id === action.id ? {
          ...state.order,
          status: action.status,
        } : state.order,
      }
    }
    case types.ORDER_CHANGE_STATUS_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        errors: action.errors,
      };
    }
    //endregion

    default:
      return {...state};
  }
}
