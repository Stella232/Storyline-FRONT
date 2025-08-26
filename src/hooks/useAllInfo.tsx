import { useEffect, useState } from 'react'
import { User } from '../models/user.model'
import { EducationModel } from '../models/education.model'
import { BePost, PostComment } from '../models/post.model'
import { getAuthToken } from '../utils/getAuthToken'
import { apiUrl } from '../utils/api'
import axios from 'axios'

export default function useAllInfo() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<BePost[]>([])
  const [comments, setComments] = useState<PostComment[]>([])
  const [educations, setEducations] = useState<EducationModel[]>([])
  const [loading, setLoading] = useState(false)

  const token = getAuthToken()

  useEffect(() => {
    fetchAllInfo()
  }, [])

  async function fetchAllInfo() {
    setLoading(true)
    try {
      const posts = await axios.get<BePost[]>(`${apiUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const users = await axios.get<User[]>(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const comments = await axios.get<PostComment[]>(`${apiUrl}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const educations = await axios.get<EducationModel[]>(
        `${apiUrl}/education`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUsers(users.data)
      setPosts(posts.data)
      setComments(comments.data)
      setEducations(educations.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return { users, posts, comments, educations, loading }
}
