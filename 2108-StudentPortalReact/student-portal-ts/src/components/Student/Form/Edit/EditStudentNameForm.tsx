import React, { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import { makeStyles, TextField, Grid, IconButton, Button } from '@material-ui/core'
import { RootState } from '../../../../redux/store'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { editInfo } from '../../../../redux/thunks'
import { IUser } from '../../../../state-structures'

const useStyle = makeStyles((theme) => ({
  root: {}
}))

interface IProps {
  setEditName: Dispatch<SetStateAction<boolean>>
}

export default function EditStudentDetailsForm (props: IProps): ReactElement {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)
  const jwt = useAppSelector((state: RootState) => state.auth.jwtToken)
  const firstName = useAppSelector((state: RootState) => state.auth.user.firstName)
  const lastName = useAppSelector((state: RootState) => state.auth.user.lastName)

  const initialFormData = {
    firstName: firstName,
    lastName: lastName
  }

  const [formData, updateFormData] = React.useState(initialFormData)
  const classes = useStyle()

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.setEditName(false)
    let submitUser: IUser = {
      userId: user.userId,
      collegeEmail: user.collegeEmail,
      recoveryEmail: user.recoveryEmail,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      profilePic: user.profilePic,
      roles: user.roles
    }
    dispatch(editInfo(submitUser, jwt))
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid
        container
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            type='text'
            label='First Name'
            id='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            label='Last Name'
            id='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
          <Button type='submit' style={{display:"none"}} />
      </Grid>
    </form>
  )
}
