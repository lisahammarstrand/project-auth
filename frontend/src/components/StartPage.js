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

  // Took out the setErrorMessage, not sure where to place it back
  // Fetch to secrets work now
  useEffect(() => {
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
      .then(data => {
        // Set the state based on the response
        setSecrets(data)
      })
      .catch(err => console.log('Error:', err))
  }, [])

  // Changed this section to line 45, did a map
  return (
    <MessageContainer>
      <h1>You are logged in</h1>
      <h2>Your soft challenges this week:</h2>
      {secrets.map(secret => {
        return (
          <div key={secret._id}>
            <p>{secret.message}</p>
          </div>
        )
      })}

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