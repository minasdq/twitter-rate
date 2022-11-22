export interface User {
  id: number,
  id_str: string,
  friends_count: number,
  followers_count: number,
  favourites_count: number,
  statuses_count: number,
  description: string,
  verified: boolean,
  profile_image_url_https: string,
  created_at: string
}

export interface UserResponse {
  data: {
    body: User
  }
}

export interface UsersResponse {
  data: {
    body: User[]
  }
}
