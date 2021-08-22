import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/global/ProtectedRoute'
import HomePage from './components/homepage/HomePage'
import SchoolHeader from './components/homepage/SchoolHeader'
import Appbar from './components/global/AppBar'
import Page404 from './components/404/Page404'
import SignInPage from './components/student-login/StudentLoginPage'
import StudentPage from './components/student-home/StudentPage'

function App () {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <Router>
      <SchoolHeader />
      <Appbar />
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/student'>
          <SignInPage />
        </Route>
        <ProtectedRoute path='/home' isAuth={isLoggedIn} component={StudentPage} />
        <Route path='/404'>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
