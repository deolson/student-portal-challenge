import { AuthActionTypes } from './action-types'
import { AppDispatch, AppThunk } from './store'
import {
  loginFailure,
  studentLoginRequest,
  studentLoginSuccess,
  updateStudent
} from './action-creators'
import axios from 'axios'
import { IStudent } from '../state-structures'

const url = 'http://localhost:9005'

export const studentLogin =
    (collegeEmail: string, password: string): AppThunk =>
      async (dispatch: AppDispatch) => {
        dispatch(studentLoginRequest())
        await axios
          .post(url + '/auth/student', { collegeEmail, password })
          .then((response) => dispatch(studentLoginSuccess(response.data)))
          .catch(() => dispatch(loginFailure()))
      }

export const logoutStudent = () => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT })
}

export const editStudentInfo =
    (student: IStudent): AppThunk =>
      async (dispatch: AppDispatch) => {
        console.log(JSON.stringify(student))
        await axios
          .put(url + '/student/update', {
            studentId: student.studentId,
            collegeEmail: student.collegeEmail,
            recoveryEmail: student.recoveryEmail,
            firstName: student.firstName,
            lastName: student.lastName,
            dateOfBirth: student.dateOfBirth,
            address: student.address,
            profilePic: student.profilePic
          })
          .then((response) => dispatch(updateStudent(response.data)))
          .catch()
      }
