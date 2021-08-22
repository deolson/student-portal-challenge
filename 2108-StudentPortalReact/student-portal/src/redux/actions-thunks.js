import { constants } from './action-types'
import { service } from './service'

export const studentLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.LOGIN_REQUEST })
    const res = await service.login(username, password) // Use the service to make requests to the database
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: res // param/action.payload to the reducer
    })
    return true
  } catch (e) {
    dispatch({ type: constants.LOGIN_FAILED })
    return false
  }
}

export const logoutStudent = () => async (dispatch) => {
  dispatch({ type: constants.LOGOUT })
}
