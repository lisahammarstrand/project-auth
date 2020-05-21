import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
// import a database Netflix?

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// USER MODEL
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

//  MIDDLEWARE TO ENABLE CORS AND JSON BODY PARSING
app.use(cors())
app.use(bodyParser.json())

// Middleware to check user's access token in DB
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(403).json({ loggedOut: true, message: 'Please login to access the content' })
  }
}

// ROUTES
app.get('/', (req, res) => {
  res.send('Technigo Auth project 2020: Lisa Hammarstrand and Anne-Sophie Gendron')
})

// ROUTE FOR REGISTER
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    // DO not store plaintext passwords
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.errors })
  }
})

// ROUTES FOR SECRETS
app.get('/secrets', authenticateUser)

// Change this to fetch data? if authenticate successsfull (try - catch status(403 = Forbidden, the client does not have access rigths to the content))
app.get('/secrets', (req, res) => {
  res.json({ secret: "This is a super secret message" })
})

// ROUTE FOR LOGIN (find a user, do not create)
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    res.status(401).json({ notFound: true, statusCode: 401, error: "Login failed" })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
