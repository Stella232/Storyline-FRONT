import { createContext, useContext, useEffect, useState } from 'react'
import { redirect } from 'react-router'
import { User } from '../models/user.model'

interface AuthContextProps {
  user: User | null
  token: string | null
  isLogged: boolean
  login: ({ user, token }: { user: User; token: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  isLogged: false,
  login: ({}: { user: User; token: string }) => {},
  logout: () => {},
})

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  async function login({ user, token }: { user: User; token: string }) {
    setUser(user)
    setToken(token)
    setIsLogged(true)
    setIsAdmin(user.isAdmin)
    localStorage.setItem('token', token as string)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin))
    localStorage.setItem('isExpert', JSON.stringify(user.isExpert))
  }

  async function logout() {
    setUser(null)
    setToken(null)
    setIsLogged(false)
    setIsAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
    redirect('/')
  }

  useEffect(() => {
    async function getToken() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || '')
      const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
      if (token && user) {
        setToken(token)
        setUser(user)
        setIsLogged(true)
        setIsAdmin(isAdmin)
      } else {
        setUser(null)
        setToken(null)
        setIsLogged(false)
        setIsAdmin(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('isAdmin')
      }
    }
    getToken()
  }, [])

  const values = { user, token, isLogged, isAdmin, login, logout }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext)
}
