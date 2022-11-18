import express from 'express'
import bodyParser from 'body-parser'
import util from 'util'
import http from 'http'
import cors from 'cors'
import request from 'request'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 5000
const get = util.promisify(request.get)
const { parsed: enviromentVariable } = dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  })
)
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  })
)
const server = http.createServer(app)
const BEARER_TOKEN = enviromentVariable?.BEARER_TOKEN
const getUsersUrl = new URL(
  'https://api.twitter.com/2/users/by/username/narvashTech'
)
const authMessage = {
  title: 'Could not authenticate',
  details: [
    `Please make sure your bearer token is correct.
      If using Glitch, remix this app and add it to the .env file`
  ],
  type: 'https://developer.twitter.com/en/docs/authentication'
}
const requestConfig = {
  url: getUsersUrl as unknown as string,
  auth: {
    bearer: BEARER_TOKEN
  },
  json: true
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/getUsers', async (req: express.Request, res: express.Response) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }
  try {
    const response = await get(requestConfig)
    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body)
      } else {
        throw new Error(response.body.error.message)
      }
    }
    res.send(response)
  } catch (e) {
    res.send(e)
  }
})
server.listen(port, () => console.log(`Listening on port ${port}`))
