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

// Main page
// 1. Register a user with name, email and choose password => button to register
// 2. Log in input with email & password => button to log in


// COMPONENTS THAT WE NEED (use of styled components)
// 1. StartPage.js
// 2. RegisterForm.js
// 3: LoginForm.js

// PAGES
// SecretPage.js