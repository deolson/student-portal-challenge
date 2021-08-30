import { IUser, IJwtResponse } from '../state-structures'
import { AuthActionTypes } from './action-types'

export const loginRequest = () => {
  return {
    type: AuthActionTypes.LOGIN_REQUEST
  }
}

export const loginSuccess = (response: IJwtResponse) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: response.user,
    jwt: response.jwtToken
  }
}

export const updateUser = (user: IUser) => {
  return {
    type: AuthActionTypes.USER_UPDATE,
    payload: user
  }
}

export const loginFailure = () => {
  return {
    type: AuthActionTypes.LOGOUT
  }
}
