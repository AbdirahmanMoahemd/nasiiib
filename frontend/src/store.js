import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdReducer,
  userReducerCount,
  userUpdatePasswordReducer,
} from "./reducers/userReducers.js";

import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./reducers/categoryReducers";
import {
  subcategoryListReducer,
  subcategoryDetailsReducer,
  subcategoryCreateReducer,
  subcategoryDeleteReducer,
  subcategoryUpdateReducer,
} from "./reducers/subCategoryReducers.js";

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewReducer,
  productUpdateReducer,
  productListReducer1,
} from "./reducers/productReducers";

import {
  slideListReducer,
  slideCreateReducer,
  slideUpdateReducer,
  sildeDetailsReducer,
} from "./reducers/slideReducers";
import {
  settingsCreateReducer,
  settingsDetailsReducer,
  settingsListReducer,
  settingsUpdateReducer,
} from "./reducers/settingsReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpd: userUpdReducer,
  userCount: userReducerCount,
  userUpdatePassword: userUpdatePasswordReducer,

  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,

  subcategoryList: subcategoryListReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  subcategoryCreate: subcategoryCreateReducer,
  subcategoryDelete: subcategoryDeleteReducer,
  subcategoryUpdate: subcategoryUpdateReducer,

  productList: productListReducer,
  productList1: productListReducer1,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,

  slideList: slideListReducer,
  sildeDetails: sildeDetailsReducer,
  slideUpdate: slideUpdateReducer,
  slideCreate: slideCreateReducer,

  settingsList: settingsListReducer,
  settingsDetails: settingsDetailsReducer,
  settingsUpdate: settingsUpdateReducer,
  settingsCreat: settingsCreateReducer,
});

const userInfoFormStorage = localStorage.getItem("userInfo-nasiib")
  ? JSON.parse(localStorage.getItem("userInfo-nasiib"))
  : "";

const initialState = {
  userLogin: { userInfo: userInfoFormStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
