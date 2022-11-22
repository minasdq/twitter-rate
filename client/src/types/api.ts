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
  created_at: string,
  screen_name: string,
  profile_image_url: string,
  name: string
}

export interface UserResponse {
  body: User
}

export interface UsersResponse {
  body: User[]
}
