import { useState, useEffect } from 'react'
import axios from 'axios'

import { getAuthToken } from '../utils/getAuthToken'
import { apiUrl } from '../utils/api'
import { BePost } from '../models/post.model'

export default function useGetPosts() {
  const [posts, setPosts] = useState<BePost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPosts() {
      const token = getAuthToken()
      try {
        const response = await axios.get<BePost[]>(`${apiUrl}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const posts = await response.data
        setPosts(posts)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [])

  return { posts, loading }
}

export function useGetPostById(id: string) {
  const [post, setPost] = useState<BePost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPostById() {
      const token = getAuthToken()
      try {
        const response = await axios.get<BePost>(`${apiUrl}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const post = await response.data
        setPost(post)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getPostById()
  }, [id])

  return { post, loading }
}
