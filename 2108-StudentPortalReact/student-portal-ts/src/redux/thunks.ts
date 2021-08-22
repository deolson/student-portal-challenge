import { AuthActionTypes } from './action-types'
import { AppDispatch } from './store'
import axios from 'axios'

const url = 'http://localhost:9005'

export const studentLogin = (collegeEmail: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthActionTypes.LOGIN_REQUEST })
  return await axios.post(url + '/auth/', { collegeEmail, password })
    .then((response) => dispatch({
      type: AuthActionTypes.LOGIN_STUDENT_SUCCESS,
      payload: response.data
    }))
    .catch(() => dispatch({
      type: AuthActionTypes.LOGIN_FAILED
    }))
}

export const logoutStudent = () => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT })
}
