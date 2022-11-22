import express from 'express'
import bodyParser from 'body-parser'
import util from 'util'
import http from 'http'
import cors from 'cors'
import request from 'request'
import dotenv from 'dotenv'
import lodash from 'lodash'

export interface User {
  id: number
  id_str: string
  friends_count: number
  followers_count: number
  favourites_count: number
  statuses_count: number
  description: string
  verified: boolean
  profile_image_url_https: string
  created_at: string
  screen_name: string
  profile_image_url: string
  name: string
}

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
const searchUserUrl = new URL(
  'https://api.twitter.com/1.1/users/show.json'
)
const searchUsersUrl = new URL(
  'https://api.twitter.com/1.1/users/search.json'
)
const getFollowersUrl = new URL(
  'https://api.twitter.com/1.1/followers/list.json'
)

const getFollowingUrl = new URL(
  'https://api.twitter.com/2/users'
)

const authMessage = {
  title: 'Could not authenticate',
  details: [
    `Please make sure your bearer token is correct.
      If using Glitch, remix this app and add it to the .env file`
  ],
  type: 'https://developer.twitter.com/en/docs/authentication'
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/get/user/:username', async (req: express.Request, res: express.Response) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }
  const requestConfig = {
    url: `${searchUserUrl as unknown as string}?screen_name=${req.params.username}`,
    auth: {
      bearer: BEARER_TOKEN
    },
    json: true
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/get/users/:query', async (req: express.Request, res: express.Response) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }
  const requestConfig = {
    url: `${searchUsersUrl as unknown as string}?q=${req.params.query}`,
    auth: {
      bearer: BEARER_TOKEN
    },
    json: true
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/get/mutual-followers', async (req: express.Request, res: express.Response) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }

  const followersRequestConfig = {
    url: `${getFollowersUrl as unknown as string}?cursor=-1&screen_name=${req.query.username as string}&skip_status=true&include_user_entities=false`,
    auth: {
      bearer: BEARER_TOKEN
    },
    json: true
  }
  const followingRequestConfig = {
    url: `${getFollowingUrl as unknown as string}/${req.query.id as string}/following`,
    auth: {
      bearer: BEARER_TOKEN
    },
    json: true
  }
  try {
    const followersResponse = await get(followersRequestConfig)
    const followingResponse = await get(followingRequestConfig)

    if (followersResponse.statusCode !== 200 || followingResponse.statusCode !== 200) {
      if (followersResponse.statusCode === 403 || followingResponse.statusCode === 400) {
        res.status(403).send(followersResponse.body)
      } else {
        throw new Error(followersResponse.body.error.message)
      }
    }
    const mutualFollowers = followersResponse.body.users.filter((user: User) => {
      return lodash.find(followersResponse.body.data || [], { id: user.id_str })
    })

    res.send({ body: mutualFollowers })
  } catch (e) {
    res.send(e)
  }
})

server.listen(port, () => console.log(`Listening on port ${port}`))
