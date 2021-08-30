import React, { ReactElement, useEffect } from 'react'
import {
  makeStyles,
  TextField,
  Grid,
  Paper,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Chip
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { studentLogin } from '../../../../redux/thunks'
import { RootState } from '../../../../redux/store'
import { useHistory } from 'react-router-dom'

const useStyle = makeStyles(() => ({
  root: {
    padding: 20,

    '&:hover': {
      boxShadow: '0px 10px 36px rgba(131,153,167,0.7)'
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10
  },
  textfield: {
    margin: '10px 0px'
  },
  submit: {
    margin: '10px 0px'
  }
}))

const initialFormData = {
  collegeEmail: '',
  password: ''
}

export default function StudentLoginForm (): ReactElement {
  const classes = useStyle()
  const dispatch = useAppDispatch()
  const history = useHistory()

  const isLoggingIn = useAppSelector((state: RootState) => state.auth.isLoggingIn)
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn)

  const [formData, updateFormData] = React.useState(initialFormData)
  const [hidePassword, setHidePassword] = React.useState(true)
  const [failedLoginAttempt, setFailedLoginAttempt] = React.useState(false)

  // If Logged in redirect to the student portal
  useEffect(() => {
    if (loggedIn) history.push('studentPortal')
  }, [loggedIn, history])

  // handle and change on the login form
  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  // toggles the ability to see the password on the form
  const handlePasswordVisibility = (): void => {
    setHidePassword(!hidePassword)
  }

  // dispatches the login thunk and sets that the user tried to login
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()
    dispatch(studentLogin(formData.collegeEmail, formData.password))
    setFailedLoginAttempt(true)
  }

  return (
    <Paper variant='outlined' className={classes.root}>
      <Typography align='center' noWrap variant='h5'>
        Student Login
      </Typography>
      {isLoggingIn && (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      )}
      {failedLoginAttempt && !isLoggingIn && (
        <div className={classes.center}>
          <Chip
            label='Incorrect Login Information'
            color='secondary'
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Grid item xs={12}>
            <TextField
              className={classes.textfield}
              variant='outlined'
              fullWidth
              type='text'
              id='collegeEmail'
              label='College Email'
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textfield}
              variant='outlined'
              fullWidth
              type={hidePassword ? 'password' : 'input'}
              id='password'
              label='Password'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handlePasswordVisibility}
                    >
                      {hidePassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
