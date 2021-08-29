import React from 'react'
import { Grid } from '@material-ui/core'
import PortalButtonContainer from '../PortalButtonContainer/PortalButtonContainer'
import HomeCarousel from '../HomeCarousel/HomeCarousel'

function HomePage () {
    
  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={10} lg={8}>
          <HomeCarousel />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <PortalButtonContainer />
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
