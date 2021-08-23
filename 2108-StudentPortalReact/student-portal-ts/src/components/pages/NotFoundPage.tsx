import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function NotFoundPage (): JSX.Element {
  return (
    <Grid
      container
      style={{ textAlign: 'center' }}
    >
      <Grid item xs={12}>
        <h1>That page doesn't exist!</h1>
        <p>Sorry, the page you were looking for could not be found.</p>
        <Link to='/'>
          <Button variant='contained' color='primary'>
            Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}
