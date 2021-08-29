import { IconButton, Input } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'
import React from 'react'
import { IStudent } from '../../../state-structures'
import { Storage } from 'aws-amplify'
import { useAppDispatch } from '../../../redux/hooks'
import { editStudentInfo } from '../../../redux/thunks'

interface Props {
  student: IStudent
}

export const UploadPhotoButton = (props: Props) => {
  const dispatch = useAppDispatch()

  async function handlePicInput (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files != null) {
      const file = event.target.files[0]
      const fileName = props.student.collegeEmail + '' + file.name
      const result: any = await Storage.put(fileName, file)
      const student = props.student
      student.profilePic = result.key
      dispatch(editStudentInfo(student))
    }
  }

  return (
    <>
      <label htmlFor='icon-button-file'>
        <IconButton
          aria-label='upload picture'
          component='span'
        >
          <AddAPhoto />
        </IconButton>
      </label>
      <Input
        id='icon-button-file'
        type='file'
        style={{ display: 'none' }}
        onChange={handlePicInput}
      />
    </>
  )
}
