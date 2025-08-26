import { redirect } from 'react-router'

export default function authLoader() {
  const currentUser = localStorage.getItem('currentUser')
  const token = localStorage.getItem('token')

  if (!currentUser && !token) {
    return redirect('/login')
  }
  return null
}
