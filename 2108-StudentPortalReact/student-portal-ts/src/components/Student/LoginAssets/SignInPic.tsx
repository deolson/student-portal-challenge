import React, { ReactElement } from 'react'
import { Hidden, makeStyles, Paper } from '@material-ui/core'
import img from '../../../assets/images/signupimg.png'

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    height: '500px',
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',

    '&:hover': {
      boxShadow: '0px 10px 36px rgba(131,153,167,0.7)'
    }
  },
  img: {
    height: '90%',
    width: '90%'
  }
}))

export default function SignInPic (): ReactElement {
  const classes = useStyles()

  return (
    <Hidden smDown>
      <Paper className={classes.paper} variant='outlined'>
        <img src={img} alt='' className={classes.img} />
      </Paper>
    </Hidden>
  )
}
