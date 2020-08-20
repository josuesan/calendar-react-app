import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import { startChecking } from '../actions/auth'
import CalendarPage from '../pages/CalendarPage/CalendarPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <h1>Waiting..</h1>
    )
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          isAuthenticated={!!uid}
          path="/login"
          component={LoginPage}
        />
        <PrivateRoute
          isAuthenticated={!!uid}
          path="/"
          component={CalendarPage}
        />
        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}

export default AppRouter
