import { AuthActionTypes } from './action-types'
import { AnyAction } from 'redux'
import { IUser } from '../state-structures'

const authInitialState = {
  jwtToken: '',
  loggedIn: false,
  isLoggingIn: false,
  user: {} as IUser
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
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        jwtToken: action.jwt,
        loggedIn: true,
        isLoggingIn: false
      }
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        jwtToken: '',
        loggedIn: false,
        isLoggingIn: false,
        user: {} as IUser
      }
    case AuthActionTypes.USER_UPDATE:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
