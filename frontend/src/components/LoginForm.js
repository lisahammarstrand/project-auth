import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from 'styled-components'

export const Form = styled.form`
  border-radius: 10px;
  margin: 100px auto;
  padding: 40px 30px 30px 30px;
  max-width: 500px;
  background: #F2F2F2;
  `

export const Input = styled.input`
line-height: 25px;
margin: 8px 0px;
font-size: 18px;
border: none;
color: black;
width: 95%;
transition: border-color $standard-transition;
background: transparent;
border-bottom: 1px solid black;
&:focus, &:active {
  outline: none;
  border-color: #F2F2F2;
  border-bottom: 2px solid #3DD990;
  }
`

export const Button = styled.button`
  display: block;
  margin: 30px 0;
  height: 54px;
  width: 100%;
  background: #8985F2;
  border-top-color: transparent;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
    &:hover {
      background: #312F73;
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