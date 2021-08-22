import { constants } from './action-types'

const authInitialState = {
  jwtToken: '',
  isLoggedIn: false,
  isLoggingIn: false,
  student: {}
}

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        jwtToken: action.payload.jwtToken,
        student: action.payload.student,
        isLoggedIn: true,
        isLoggingIn: false
      }
    case constants.LOGIN_FAILED:
      return {
        ...state,
        isLoggingIn: false
      }
    case constants.LOGOUT:
      return {
        ...state,
        jwtToken: '',
        isLoggedIn: false,
        isLoggingIn: false,
        student: {}
      }
    default:
      return state
  }
}
