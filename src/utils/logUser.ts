import axios from 'axios'
import { apiUrl } from './api'
import { User, UserSignup } from '../models/user.model'

export default async function logUser({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> {
  const user = await axios.post(`${apiUrl}/auth/login`, { email, password })
  if (user.data.error) {
    throw new Error(user.data.error)
  }
  return user.data
}

export async function signupUser({
  firstName,
  lastName,
  email,
  phone,
  address,
  occupation,
  profilePicture,
  password,
}: UserSignup): Promise<User> {
  const user = await axios.post(`${apiUrl}/auth/signup`, {
    firstName,
    lastName,
    email,
    phone,
    address,
    occupation,
    profilePicture,
    password,
    confirmPassword: password,
    isAdmin: false,
  })

  if (user.data.error) {
    throw new Error(user.data.error)
  }
  return user.data
}
