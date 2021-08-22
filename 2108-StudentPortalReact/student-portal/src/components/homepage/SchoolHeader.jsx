import React from 'react'
import { Paper, makeStyles, Typography, Grid, Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  headerpaper: {
    background: '#262626',
    height: 100
  },
  grid: {
    height: '100%'
  },
  schoolname: {
    color: '#fff'
  },
  insp: {
    background: '#a0a0a0',
    height: '100%'
  },
  typography: {
    fontFamily: 'Apple Color Emoji'
  }
}))

export default function SchoolHeader () {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.headerpaper} square>
        <Grid container alignItems='center' className={classes.grid}>
          <Grid item xs={1} />
          <Grid item xs={10} md={5} lg={5}>
            <Typography variant='h2' className={classes.schoolname}>
              School Name
            </Typography>
          </Grid>
          <Hidden only={['xs', 'sm']}>
            <Grid item xs={10} md={5} align='center' style={{ height: '40%' }}>
              <Paper elevation={20} className={classes.insp}>
                <Typography variant='h4' className={classes.typography}>
                  Together We Soar!
                </Typography>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </>
  )
}
