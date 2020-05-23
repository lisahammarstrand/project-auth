import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'lib/Button'
import { MessageContainer } from 'lib/MessageContainer'

const url = "https://auth-project-technigo.herokuapp.com/secrets"

export const StartPage = props => {
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const accessToken = window.localStorage.getItem("accessToken")
  const [secrets, setSecrets] = useState([]) //1

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
      .then(json => setMessage(json.message))
      .catch(err => {
        setErrorMessage(err.message)
      })
  }, [accessToken])

  return (
    <MessageContainer>
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
        <Button background="#8985F2" hover="#312F73"
          type="button"
          onClick={() => window.localStorage.removeItem("accessToken")}
        >
          <Link to={`/`}>
            {errorMessage ? "Sign in" : "Log out"}
          </Link>
        </Button>
      </div>
    </MessageContainer>
  )
}