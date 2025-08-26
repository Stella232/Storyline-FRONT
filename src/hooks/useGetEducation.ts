import { useState, useEffect } from 'react'
import { EducationModel } from '../models/education.model'
import axios from 'axios'
import { getAuthToken } from '../utils/getAuthToken'
import { apiUrl } from '../utils/api'

export default function useGetEducation() {
  const [education, setEducation] = useState<EducationModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getEducation() {
      const token = getAuthToken()
      try {
        const response = await axios.get<EducationModel[]>(
          `${apiUrl}/education`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const education = await response.data
        setEducation(education)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getEducation()
  }, [])

  return { education, loading }
}

export function useGetEducationById(id: string) {
  const [education, setEducation] = useState<EducationModel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getEducationById() {
      const token = getAuthToken()
      try {
        const response = await axios.get<EducationModel>(
          `${apiUrl}/education/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const education = await response.data
        setEducation(education)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getEducationById()
  }, [id])

  return { education, loading }
}
