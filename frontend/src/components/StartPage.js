import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Card = styled.div`
  border-radius: 10px;
  margin: 100px auto;
  padding: 40px 30px 30px 30px;
  max-width: 500px;
  background: #F2F2F2;
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
    <Card>
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
          <Link to={`/`}>
            <div>{errorMessage ? "Sign in" : "Log out"}</div>
          </Link>
        </Button>
      </div>
    </Card>
  )
}