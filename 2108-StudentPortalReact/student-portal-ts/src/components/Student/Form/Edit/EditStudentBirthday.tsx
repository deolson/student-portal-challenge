import { Button, Grid, IconButton, TextField } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { RootState } from '../../../../redux/store'
import { editInfo } from '../../../../redux/thunks'

interface IProps {
  setEditBirthday: Dispatch<SetStateAction<boolean>>
}

export default function EditStudentBirthday (props: IProps): ReactElement {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)
  const jwt = useAppSelector((state: RootState) => state.auth.jwtToken)
  const dateOfBirth = useAppSelector(
    (state: RootState) => state.auth.user.dateOfBirth
  )

  const initialFormData = {
    dateOfBirth: dateOfBirth
  }

  const [formData, updateFormData] = React.useState(initialFormData)

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.setEditBirthday(false)
    user.dateOfBirth = formData.dateOfBirth
    dispatch(editInfo(user, jwt))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent='space-evenly' alignItems='center'>
        <Grid item xs={11}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            type='date'
            id='dateOfBirth'
            defaultValue={user.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                min: '1900-01-01',
                max: '9999-01-01'
              }
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton type='submit'>
            <ArrowForward color='primary' />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  )
}
