import { AuthActionTypes } from './action-types'
import { AnyAction } from 'redux'
import { IStudent, IAdmin } from '../state-structures'

const authInitialState = {
  jwtToken: '',
  loggedIn: false,
  isLoggingIn: false,
  student: null as IStudent | null,
  admin: null as IAdmin | null
}

export const authReducer = (
  state = authInitialState,
  action: AnyAction
): typeof authInitialState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      }
    case AuthActionTypes.LOGIN_STUDENT_SUCCESS:
      return {
        ...state,
        student: action.payload,
        loggedIn: true,
        isLoggingIn: false
      }
    case AuthActionTypes.LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        admin: action.payload,
        loggedIn: true,
        isLoggingIn: false
      }
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        jwtToken: '',
        loggedIn: false,
        isLoggingIn: false,
        student: null,
        admin: null
      }
    case AuthActionTypes.STUDENT_UPDATE:
      return {
        ...state,
        student: action.payload
      }
    default:
      return state
  }
}
