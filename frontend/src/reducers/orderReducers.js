import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_REQUEST2,
  ORDER_PAY_SUCCESS2,
  ORDER_PAY_RESET2,
  ORDER_PAY_FAIL2,
  ORDER_LIST_REQUEST2,
  ORDER_LIST_SUCCESS2,
  ORDER_LIST_FAIL2,
  RECENTORDER_LIST_REQUEST,
  RECENTORDER_LIST_SUCCESS,
  RECENTORDER_LIST_FAIL,
  ORDER_CREATE_REQUEST_EVC,
  ORDER_CREATE_SUCCESS_EVC,
  ORDER_CREATE_FAIL_EVC,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderCreateReducerEvc = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST_EVC:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS_EVC:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL_EVC:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, products: [],meals:[] ,shippingAddress: {}, user:{} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer2 = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST2:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS2:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL2:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET2:
      return {};
    default:
      return state;
  }
};
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMyListReducer = (
  state = { orders: [] },
  action
) => {
  switch (action.type) {   
    case ORDER_MY_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_MY_LIST_RESET:
      return {
        orders: [],
      }; 
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const recentOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case RECENTORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case RECENTORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case RECENTORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderReducerCount = (state = { counter: {} }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST2:
      return { loading: true, counter: {} };
    case ORDER_LIST_SUCCESS2:
      return {
        loading: false,
        counter: action.payload,
      };
    case ORDER_LIST_FAIL2:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
