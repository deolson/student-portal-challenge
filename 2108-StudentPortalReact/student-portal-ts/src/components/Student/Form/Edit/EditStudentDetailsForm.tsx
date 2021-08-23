import React, { ReactElement } from 'react'
import { makeStyles, TextField, Grid } from '@material-ui/core'
import { RootState } from '../../../../redux/store'
import { useAppSelector } from '../../../../redux/hooks'

const useStyle = makeStyles((theme) => ({
  root: {}
}))

const initialFormData = {
  firstName: '',
  lastName: ''
}

export default function EditStudentDetailsForm (): ReactElement {
  const student = useAppSelector((state: RootState) => state.auth.student)
  const [formData, updateFormData] = React.useState(initialFormData)
  const classes = useStyle()

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  return (
    <form className={classes.root}>
      <Grid
        container
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Grid item xs={5}>
          <TextField
            variant='outlined'
            fullWidth
            type='text'
            label='First Name'
            id='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant='outlined'
            fullWidth
            label='Last Name'
            value={(student != null) ? student.firstName : ''}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  )
}
