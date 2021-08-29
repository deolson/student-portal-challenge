import React from 'react'
import { Grid, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  buttonContainer: {
    marginTop: '30px',

    '& Button': {
      margin: '15px',
      width: '80%',
      height: '70px'
    }
  }
}))

export default function PortalButtonContainer () {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.buttonContainer}>
        <Grid container justifyContent='center' item xs={6}>
          <Link
            to='/student'
            style={{ width: '100%', color: 'inherit', textDecoration: 'inherit' }}
          >
            <Button
              variant='contained'
              color='primary'
              disableElevation
            >
              Student Login
            </Button>
          </Link>
        </Grid>
        <Grid container justifyContent='center' item xs={6}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
          >
            Parent Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
          >
            Admin Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
          >
            Teacher Login
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
