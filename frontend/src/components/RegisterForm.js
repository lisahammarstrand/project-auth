import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
export const Label = styled.label`
  line-height: 1px;
  color: #666;
  font-size: 13px;
  padding: 10px;  
`

export const Link = styled.link`
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

const url = "https://auth-project-technigo.herokuapp.com/users"

export const RegisterForm = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registered, setRegistered] = useState(false)
  const [failed, setFailed] = useState(false)
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status !== 201) {
          return (
            res.json()
              .then(json => console.log(json.message)), setFailed(true)
          )
        } else {
          setRegistered(true)
        }
      })
      .catch(err => console.log('Error:', err))
  }

  const reDirect = () => {
    history.push(`/`)
  }

  return (
    <div>
      {!registered && (
        <div>
          <Form onSubmit={handleSubmit}>
            {!failed &&
              <h1>Create new account</h1>
            }
            {failed && (
              <p>Couldn't create new account. Try another name or email.</p>
            )}

            <Label>
              Name
            {name.length < 2 && name.length !== 0 && " is too short"}
              {name.length > 20 && " is too long"}
              <Input
                type="text"
                required
                value={name}
                lowercase
                onChange={event => setName(event.target.value.toLowerCase())}
              ></Input>
            </Label>

            <Label>
              Email
            {email.length < 2 && email.length !== 0 && " is too short"}
              {email.length > 20 && "is too long"}
              <Input
                type="text"
                required
                value={email}
                lowercase
                onChange={event => setEmail(event.target.value.toLowerCase())}
              ></Input>
            </Label>

            <Label>
              Password{" "}
              {password.length < 5 && password.length !== 0 && " is too short"}
              <Input
                type="password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              ></Input>
            </Label>

            <Button
              type="submit"
              disabled={
                name.length > 1 && name.length < 21 && password.length > 4 && email ? false : true
              }
              onClick={handleSubmit}
            >Register</Button>

            <p>Already have an account?</p>
            <Button
              type="button"
              onClick={reDirect}
            >Sign in</Button>

          </Form>
        </div>
      )}

      {registered && (
        <div>
          <h1>Congratulations, account created</h1>
        </div>
      )}
    </div>
  )
      }