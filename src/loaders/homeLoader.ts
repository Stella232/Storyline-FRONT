import { redirect } from 'react-router'

export default function homeLoader() {
  const currentUser = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '{}')

  if (currentUser && token) {
    if (isAdmin) {
      return redirect('/admin/manage-users')
    }
    return redirect('/feeds')
  }
  return null
}
