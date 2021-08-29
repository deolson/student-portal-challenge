import React from 'react'
import {
  Paper,
  Button,
  makeStyles,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Chip
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { useDispatch, useSelector } from 'react-redux'
import { studentLogin } from '../../redux/actions-thunks'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      boxShadow: '0px 10px 36px rgba(131,153,167,0.7)'
    }
  },
  header: {
    paddingTop: '20px',
    fontWeight: 600
  },
  subheader: {
    marginBottom: 10
  },
  button: {
    width: '100%',
    marginBottom: 20
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    margin: '0 auto',
    marginBottom: 10
  }
}))

const initialFormData = {
  userEmail: '',
  password: ''
}

const SignInForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [hidePassword, setHidePassword] = React.useState(true)
  const [submitError, setsubmitError] = React.useState(false)
  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [formData, updateFormData] = React.useState(initialFormData)

  if (isLoggedIn) {
    history.push('/home')
  }

  const handleVisibility = () => {
    setHidePassword(!hidePassword)
  }

  const handleChange = (event) => {
    updateFormData({
      ...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    const bool = dispatch(studentLogin(formData.userEmail, formData.password))
    console.log(bool);
    setsubmitError(true)
  }

  return (
    <>
      <Paper className={classes.paper} variant='outlined'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          {isLoggingIn && <CircularProgress />}
        </div>
        <Typography
          align='center'
          noWrap
          variant='h5'
          className={classes.header}
        >
          Sign In!
        </Typography>
        <Typography
          align='center'
          noWrap
          variant='h6'
          className={classes.subheader}
        >
          It's quick and easy.
        </Typography>
        {submitError && !isLoggingIn && (
          <Chip
            label='Wrong Email / Password'
            color='secondary'
            className={classes.chip}
          />
        )}
        <form onSubmit={handleFormSubmit}>
          <Grid
            container
            spacing={3}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={10} style={{ textAlign: 'center' }}>
              <TextField
                id='userEmail'
                label='Email'
                placeholder='Email'
                margin='dense'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'center' }}>
              <TextField
                id='password'
                label='Password'
                placeholder='Password'
                margin='dense'
                variant='outlined'
                fullWidth
                type={hidePassword ? 'password' : 'input'}
                required
                InputProps={{
                  endAdornment: (
                    <VisibilityIcon
                      onClick={handleVisibility}
                    />
                  )
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Sign In!
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}

export default SignInForm
