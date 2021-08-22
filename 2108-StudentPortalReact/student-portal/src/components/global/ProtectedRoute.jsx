import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ isAuth, ...routeProps }) => {
  if (isAuth) {
    return <Route {...routeProps} />
  } else {
    return <Redirect to='/' />
  }
}

export default ProtectedRoute
