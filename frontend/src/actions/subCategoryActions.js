import {
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_REQUEST,
  SUBCATEGORY_UPDATE_FAIL,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_DETAILS_SUCCESS,
  SUBCATEGORY_DETAILS_REQUEST,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_FAIL,
} from "../constants/subCategoryConstants";
import axios from "axios";

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });

    const { data } = await axios.get("/api/subcategory");

    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listFooterSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FOOTERSUBCATEGORY_LIST_REQUEST });

    const { data } = await axios.get("/api/subcategory/footer");

    dispatch({
      type: FOOTERSUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOOTERSUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/subcategory/${id}`);

    dispatch({
      type: SUBCATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subcategory/${id}`, config);

    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubCategory =
  (name, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBCATEGORY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/subcategory`,
        { name, category },
        config
      );

      dispatch({
        type: SUBCATEGORY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSubCategory =
  (subcategory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBCATEGORY_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/subcategory/${subcategory._id}`,
        subcategory,
        config
      );

      dispatch({
        type: SUBCATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
