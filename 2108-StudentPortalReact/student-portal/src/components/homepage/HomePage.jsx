import React from 'react'
import { Grid } from '@material-ui/core'
import Appbar from '../global/AppBar'
import HomeCarousel from './HomeCarousel'
import SchoolHeader from './SchoolHeader'
import PortalButtonContainer from './PortalButtonContainer'

function App () {
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

export default App
