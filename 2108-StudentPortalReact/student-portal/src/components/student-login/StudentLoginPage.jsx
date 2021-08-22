import React from 'react'
import { Grid } from '@material-ui/core'
import SignInForm from './StudentLoginForm'
import SignInPic from './SignInPic'

const SignInPage = () => {
  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ height: '80%' }}
        spacing={2}
      >
        <Grid item xs={11} md={5} lg={4}>
          <SignInForm />
        </Grid>
        <Grid item xs={10} md={5} lg={4}>
          <SignInPic />
        </Grid>
      </Grid>
    </>
  )
}

export default SignInPage
