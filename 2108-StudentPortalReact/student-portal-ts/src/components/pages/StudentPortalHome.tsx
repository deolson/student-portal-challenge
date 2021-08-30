import { Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import StudentProfileCard from '../Student/Card/StudentProfileCard'

export default function StudentPortalHome (): ReactElement {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      style={{height: "70%"}}
    >
      <StudentProfileCard />
    </Grid>
  )
}
