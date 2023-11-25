import axios from 'axios'
import {
  SETTINGS_LIST_FAIL, SETTINGS_LIST_REQUEST, SETTINGS_LIST_SUCCESS,
  SETTINGS_UPDATE_FAIL, SETTINGS_UPDATE_RESET, SETTINGS_UPDATE_SUCCESS, SETTINGS_UPDATE_REQUEST,
  SETTINGS_DETAILS_FAIL, SETTINGS_DETAILS_SUCCESS, SETTINGS_DETAILS_REQUEST, SETTINGS_DETAILS_RESET, SETTINGS_CREATE_SUCCESS, SETTINGS_CREATE_REQUEST, SETTINGS_CREATE_FAIL
} from "../constants/settingsConstants.js"



export const listsettings = () => async (dispatch) => {
    try {
        dispatch({ type: SETTINGS_LIST_REQUEST })

        const { data } = await axios.get('/api/settings')

        dispatch({
            type: SETTINGS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SETTINGS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
       })  
    }
}




export const getSettingsDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SETTINGS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/settings/${id}`, config)

    dispatch({
      type: SETTINGS_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SETTINGS_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}
export const updateSettings = (settings) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SETTINGS_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
    headers: {
        'Content-Type': 'application/json',      
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.put(`/api/settings/${settings._id}`, settings, config)

    dispatch({
        type: SETTINGS_UPDATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: SETTINGS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const createSettings = ( phoneNumber,logo ) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SETTINGS_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.post(`/api/settings`, { phoneNumber, logo }, config)

    dispatch({
        type: SETTINGS_CREATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: SETTINGS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


