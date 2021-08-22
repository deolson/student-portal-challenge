import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  paper: {
    marginLeft: 20
  }
}))

export default function CoursesCard (props) {
  const classes = useStyles()
  return (
    <>
      <Paper elevation={6} style={{ width: '80%', padding: 20 }}>
        <Typography variant='h4' display='block'>
          Courses:
        </Typography>
        <Paper variant='outlined' />
      </Paper>
    </>
  )
}
