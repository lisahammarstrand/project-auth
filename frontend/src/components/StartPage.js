import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const url = "https://auth-project-technigo.herokuapp.com/secrets"

export const StartPage = props => {
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const accessToken = window.localStorage.getItem("accessToken")

  useEffect(() => {
    setErrorMessage("")
    fetch(url, {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Please login to see the content", JSON)
        } else {
          return response.json()
        }
      })
      .then(json => setMessage(json.secret))
      .catch(err => {
        setErrorMessage(err.message)
      })
  }, [accessToken])

  return (
    <div>
      {message && (
        <div>
          <h1>You are logged in</h1>
          <p>{message}</p>
        </div>
      )}

      <div>
        {errorMessage &&
          <div>{errorMessage}</div>
        }
        <Button
          type="button"
          onClick={() => window.localStorage.removeItem("accessToken")}
        >
          <Link to={`/`}>{errorMessage ? "Sign in" : "Log out"}</Link>
        </Button>
      </div>
    </div >
  )
}