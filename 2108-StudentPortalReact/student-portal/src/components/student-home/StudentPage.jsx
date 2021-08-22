import React from 'react'
import StudentCard from './StudentCard'
import { Grid } from '@material-ui/core'

export default function StudentPage () {
  return (
    <Grid container style={{ marginTop: 60, width: '100%' }} justifyContent='center'>
      <Grid item xs={12} md={6}>
        <StudentCard />
      </Grid>
    </Grid>
  )
}
