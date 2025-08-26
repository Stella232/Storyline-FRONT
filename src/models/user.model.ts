export interface User {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string
  phone: string
  email: string
  isAdmin: boolean
  isExpert: boolean
  address: string
  occupation: string
  token: string
  posts: string[]
  disabled: boolean
  createdAt: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserSignup {
  firstName: string
  lastName: string
  email: string
  phone: string
  profilePicture: string
  address: string
  occupation: string
  password: string
  confirmPassword: string
  isAdmin: boolean
}
