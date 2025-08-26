import { redirect } from 'react-router'

export default function adminLoader() {
  console.log('===================')
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '{}')

  if (!user || !token || !isAdmin) {
    return redirect('/feeds')
  }

  return null
}
export function expertLoader() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')
  const isExpert = JSON.parse(localStorage.getItem('isExpert') || '{}')

  if (!user && !token && !isExpert) {
    return redirect('/feeds')
  }

  return null
}
