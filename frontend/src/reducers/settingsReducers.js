import {
  SETTINGS_LIST_FAIL, SETTINGS_LIST_REQUEST, SETTINGS_LIST_SUCCESS,
  SETTINGS_UPDATE_FAIL, SETTINGS_UPDATE_RESET, SETTINGS_UPDATE_SUCCESS, SETTINGS_UPDATE_REQUEST,
  SETTINGS_DETAILS_FAIL, SETTINGS_DETAILS_SUCCESS, SETTINGS_DETAILS_REQUEST, SETTINGS_DETAILS_RESET, SETTINGS_CREATE_SUCCESS, SETTINGS_CREATE_REQUEST, SETTINGS_CREATE_FAIL, SETTINGS_CREATE_RESET
} from "../constants/settingsConstants.js"


export const settingsListReducer = (state = { settings: [] }, action) => {
    switch (action.type) {
        case SETTINGS_LIST_REQUEST:
            return { loading: true, settings: [] }
        case SETTINGS_LIST_SUCCESS:
            return {
                loading: false,
                settings: action.payload,
            }
        case SETTINGS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

 


export const settingsDetailsReducer = (state = { setting: {} }, action) => {
  switch (action.type) {
    case SETTINGS_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SETTINGS_DETAILS_SUCCESS:
      return { loading: false, setting: action.payload }
    case SETTINGS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case SETTINGS_DETAILS_RESET:
      return { setting: {} }
    default:
      return state
  }
}


export const settingsUpdateReducer = (state = { settings: {} } , action) => {
    switch (action.type) {
        case SETTINGS_UPDATE_REQUEST:
            return { loading: true}
        case SETTINGS_UPDATE_SUCCESS:
            return { loading: false, success: true, settings: action.payload}
        case SETTINGS_UPDATE_RESET:
            return { settings: {} }
        case SETTINGS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const settingsCreateReducer = (state = {} , action) => {
    switch (action.type) {
        case SETTINGS_CREATE_REQUEST:
            return { loading: true}
        case SETTINGS_CREATE_SUCCESS:
            return { loading: false, success: true, settings: action.payload }
        case SETTINGS_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SETTINGS_CREATE_RESET:
            return {}
        default:
            return state
    }
}