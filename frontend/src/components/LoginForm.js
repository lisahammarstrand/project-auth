import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from 'lib/Button'
import { Input } from 'lib/Input'
import { Form } from 'lib/Form'
import { Label } from 'lib/Label'

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory()
  const url = "https://project-auth-deployment.herokuapp.com/sessions"

  const handleSignIn = e => {
    e.preventDefault()
    setErrorMessage("")
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Incorrect email and/or password")
        } else {
          return res.json()
        }
      })
      .then(({ accessToken }) => {
        if (accessToken) {
          window.localStorage.setItem("accessToken", accessToken)
          history.push(`/secret`)
        }
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }
  const reDirect = () => {
    history.push(`/register`)
  }

  return (
    <div>
      <Form>
        <h1>Sign-in</h1>
        <Label>
          Email
          <Input
            type="email"
            required
            value={email}
            onChange={event => setEmail(event.target.value.toLowerCase())}
          />
        </Label>

        <Label>
          Password
          <Input
            type="password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Label>

        <div>{errorMessage}</div>

        <Button background="#8985F2" hover="#312F73"
          type="submit"
          onClick={handleSignIn}
        >Login</Button>

        <Button background="#8985F2" hover="#312F73"
          type="button"
          onClick={reDirect}
        >
          Not a member?
        </Button>

      </Form>
    </div>
  )
}
