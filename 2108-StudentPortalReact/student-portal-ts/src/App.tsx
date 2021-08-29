import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'
import NotFoundPage from './components/pages/NotFoundPage'
import ProtectedRoute from './components/hoc/ProtectedRoute'
import StudentSignInPage from './components/pages/StudentSignInPage'
import { CssBaseline } from '@material-ui/core'
import StudentPortalHome from './components/pages/StudentPortalHome'
import Navbar from './components/Navbar/Navbar'
import SchoolHeader from './components/SchoolHeader/SchoolHeader'
import HomePage from './components/pages/HomePage'

function App (): JSX.Element {
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn)

  return (
    <>
      <CssBaseline />
      <Router>
        <SchoolHeader />
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/student' exact>
            <StudentSignInPage />
          </Route>
          <ProtectedRoute
            path='/studentPortal'
            isAuth={loggedIn}
            component={StudentPortalHome}
          />
          <Route path='/'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
