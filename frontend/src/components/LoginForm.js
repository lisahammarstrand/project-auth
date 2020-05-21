import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from 'styled-components'

export const Form = styled.form`
  margin: 60px auto;
  display: block;
  padding: 20px 30px 30px 30px;
  max-width: 480px;
  background: #ededed;
  border-radius: 8px;
  `

export const Input = styled.input`
  /* position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  width: 100%;
  transition: border-color $standard-transition;
  z-index: 2;
  display: block;
  background: transparent;
  line-height: 54px;
  margin: 10px 0px;
  padding: 0 10px;
  font-size: 15px;
  border: none;
  color: #333;
  border-radius: 3px;
  border: 1px solid transparent;
  border-bottom: 1px solid black;
  &:focus, &:active {
    outline: none;
    border-color: #ededed;
    border-bottom: 2px solid black;
  }
`

export const Button = styled.button`
  display: block;
  margin: 30px 0;
  height: 54px;
  width: 100%;
  background: #33cc77;
  border: 1px solid darken(#33cc77,0.1);
  border-top-color: transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: -1px -1px rgba(0,0,0,0.1);
  transition: background $standard-transition;
  &:hover {
    background: lighten(#33cc77,10%);
    cursor: pointer;
  }
  `

export const Label = styled.label`
  line-height: 1px;
  color: #666;
  font-size: 13px;
  padding: 10px;  
`

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory()
  const url = "https://auth-project-technigo.herokuapp.com/sessions"

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

        <Button
          type="submit"
          onClick={handleSignIn}
        >Login</Button>

        <Button
          type="button"
          onClick={reDirect}
        >
          Not a member?
        </Button>

      </Form>
    </div>
  )
}