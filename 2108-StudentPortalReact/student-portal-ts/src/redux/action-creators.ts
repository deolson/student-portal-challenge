import { IStudent } from '../state-structures'
import { AuthActionTypes } from './action-types'

export const studentLoginRequest = () => {
  return {
    type: AuthActionTypes.LOGIN_REQUEST
  }
}

export const studentLoginSuccess = (student: IStudent) => {
  return {
    type: AuthActionTypes.LOGIN_STUDENT_SUCCESS,
    payload: student
  }
}

export const updateStudent = (student: IStudent) => {
  return {
    type: AuthActionTypes.STUDENT_UPDATE,
    payload: student
  }
}

export const loginFailure = () => {
  return {
    type: AuthActionTypes.LOGOUT
  }
}
