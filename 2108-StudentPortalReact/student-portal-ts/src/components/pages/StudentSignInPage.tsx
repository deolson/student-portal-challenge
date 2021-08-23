import React, { ReactElement } from 'react'
import { Grid } from '@material-ui/core'
import StudentLoginForm from '../Student/Form/Login/StudentLoginForm'
import SignInPic from '../Student/LoginAssets/SignInPic'

export default function StudentSignInPage (): ReactElement {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{ height: '80%' }}
      spacing={2}
    >
      <Grid item xs={11} md={5} lg={4}>
        <StudentLoginForm />
      </Grid>
      <Grid item xs={10} md={5} lg={4}>
        <SignInPic />
      </Grid>
    </Grid>
  )
}
