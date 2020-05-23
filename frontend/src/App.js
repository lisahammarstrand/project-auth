import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RegisterForm } from 'components/RegisterForm'
import { StartPage } from 'components/StartPage'
import { LoginForm } from 'components/LoginForm'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/secret" component={StartPage} />
        <Route exact path="/register" component={RegisterForm} />
      </Switch>
    </BrowserRouter>
  )
}