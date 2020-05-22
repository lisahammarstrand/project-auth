import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const Form = styled.form`
  border-radius: 10px;
  margin: 100px auto;
  padding: 40px 30px 30px 30px;
  max-width: 500px;
  background: #F2F2F2;
  `

export const Card = styled.form`
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
export const Label = styled.label`
  color: grey;
  font-size: 13px;
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

  //redirect to register page
  const reDirect = () => {
    history.push(`/`)
  }

  //redirect to start page if account creaction successul
  const reDirectMain = () => {
    history.push(`/secret`)
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
              {name.length > 15 && " is too long"}
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

{/* Confirmation page  */}
      {registered && (
        <Card>
          <p>Congratulations, account created</p>
            <Button
              type="button"
              onClick={reDirectMain}
            >To login page</Button>
        </Card>
      )}
    </div>
  )
      }