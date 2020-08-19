import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import CalendarPage from '../pages/CalendarPage/CalendarPage'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/calendar" component={CalendarPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}

export default AppRouter
