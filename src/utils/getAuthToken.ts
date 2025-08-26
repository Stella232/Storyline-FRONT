export function getAuthToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}
