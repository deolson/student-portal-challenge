import React, { useState, useEffect } from 'react'
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  CardMedia,
  IconButton,
  CardContent
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import EditIcon from '@material-ui/icons/Edit'
import { Storage } from 'aws-amplify'
import EditStudentButton from './EditStudentButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 30,
    // height: 250,
    width: '100%'
  },
  title: {
    padding: 0
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    flex: '1 0 auto',
    width: '100%'
  },
  cover: {
    minWidth: '250px'
  },
  paper: {
    marginLeft: 10
  }
}))

export default function StudentCard () {
  const classes = useStyles()
  const [url, setURL] = useState([])
  const student = useSelector((state) => state.auth.student)

  useEffect(() => {
    getProfilePicture(student.profilePic)
  })

  const getProfilePicture = (profileImg) => {
    console.log('getting' + profileImg)
    Storage.get(profileImg)
      .then((url) => {
        const myRequest = new Request(url)
        fetch(myRequest).then(function (response) {
          if (response.status === 200) {
            setURL(url)
          }
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={url} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            display='inline'
            className={classes.title}
          >
            Profile Details:
          </Typography>
          <IconButton aria-label='edit' style={{ float: 'right' }}>
            <EditStudentButton />
          </IconButton>
          <hr />
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant='h6'
                display='inline'
                className={classes.paper}
              >
                First Name:
              </Typography>
              <Typography
                variant='body1'
                display='inline'
                className={classes.paper}
              >
                {student.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h6'
                display='inline'
                className={classes.paper}
              >
                Last Name:
              </Typography>
              <Typography
                variant='body1'
                display='inline'
                className={classes.paper}
              >
                {student.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h6'
                display='inline'
                className={classes.paper}
              >
                Date of Birth:
              </Typography>
              <Typography
                variant='body1'
                display='inline'
                className={classes.paper}
              >
                {student.dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h6'
                display='inline'
                className={classes.paper}
              >
                Address:
              </Typography>
              <Typography
                variant='body1'
                display='inline'
                className={classes.paper}
              >
                {student.address}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}
