import { useState, useEffect } from 'react'
import axios from 'axios'

import { getAuthToken } from '../utils/getAuthToken'
import { apiUrl } from '../utils/api'
import { User } from '../models/user.model'

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUsers() {
      const token = getAuthToken()
      try {
        const response = await axios.get<User[]>(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const users = await response.data
        setUsers(users)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  return { users, loading }
}
export function useGetUser(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const token = getAuthToken()
      try {
        const response = await axios.get<User>(`${apiUrl}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const user = await response.data
        setUser(user)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  return { user, loading }
}
