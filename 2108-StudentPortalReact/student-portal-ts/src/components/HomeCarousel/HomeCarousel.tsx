import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { makeStyles, Paper, Grid } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  carousel: {
    width: '100%',
    height: '100%',
    maxHeight: '600px'
  }
}))

export default function HomeCarousel () {
  const classes = useStyles()
  return (
    <Carousel className={classes.carousel}>
      <Carousel.Item>
        <img
          className={classes.carousel}
          src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
          alt='Second slide'
        />
        <Carousel.Caption>
          <Grid container justifyContent='center' alignItems='center'>
            <Paper style={{ width: '50%' }}>
              <h1>Excellence</h1>
            </Paper>
          </Grid>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={classes.carousel}
          src='https://www.umassmed.edu/globalassets/office-of-communications/images/gallery/hires/students-on-quad.gif'
          alt='First slide'
        />
        <Carousel.Caption>
          <Grid container justifyContent='center' alignItems='center'>
            <Paper style={{ width: '66%' }}>
              <h1>Communication</h1>
            </Paper>
          </Grid>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={classes.carousel}
          src='https://images.unsplash.com/photo-1543269865-cbf427effbad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWRlbnRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
          alt='Third slide'
        />
        <Carousel.Caption>
          <Grid container justifyContent='center' alignItems='center'>
            <Paper style={{ width: '50%' }}>
              <h1>Community</h1>
            </Paper>
          </Grid>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
