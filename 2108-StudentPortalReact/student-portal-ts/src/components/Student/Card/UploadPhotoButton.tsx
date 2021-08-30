import { IconButton, Input } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'
import React from 'react'
import { IUser } from '../../../state-structures'
import { Storage } from 'aws-amplify'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { editInfo } from '../../../redux/thunks'
import { RootState } from '../../../redux/store'

export const UploadPhotoButton = () => {
  const dispatch = useAppDispatch()
  const jwt = useAppSelector((state: RootState) => state.auth.jwtToken)
  const user = useAppSelector((state: RootState) => state.auth.user)

  async function handlePicInput (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files != null) {
      const file = event.target.files[0]
      const fileName = user.collegeEmail + '' + file.name
      const result: any = await Storage.put(fileName, file)
      user.profilePic = result.key
      dispatch(editInfo(user, jwt))
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
