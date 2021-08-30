import { AuthActionTypes } from './action-types'
import { AppDispatch, AppThunk } from './store'
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  updateUser
} from './action-creators'
import axios from 'axios'
import { IUser } from '../state-structures'

const url = 'http://3.128.199.247:9010'
// const url = 'localhost:9010'

export const studentLogin =
    (collegeEmail: string, password: string): AppThunk =>
      async (dispatch: AppDispatch) => {
        dispatch(loginRequest())
        await axios
          .post(url + '/auth/signin', { collegeEmail, password })
          .then((response) => {
            console.log(response);
            dispatch(loginSuccess(response.data))
          })
          .catch(() => dispatch(loginFailure()))
      }

export const logoutStudent = () => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT })
}


//Edit User info thunk
//If a response is given with an ok status code we go ahead and dispatch an update action based on the updated user info
//No other actions or thunks are dispatched by this function
export const editInfo =
    (user: IUser, jwt: string): AppThunk =>
      async (dispatch: AppDispatch) => {
        await axios
          .put(url + '/student/update', {
            studentId: user.userId,
            collegeEmail: user.collegeEmail,
            recoveryEmail: user.recoveryEmail,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            profilePic: user.profilePic
          },
          {
            headers: {
              authorization: 'Bearer ' + jwt
            }
          })
          .then((response) => {
              if(response.status === 200) {
                dispatch(updateUser(user))
              }
          })
          .catch(() => {})
      }
