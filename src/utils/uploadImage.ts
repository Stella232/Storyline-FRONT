import axios from 'axios'
import {
  CloudinaryUrl,
  PresetKey,
  CloudinaryVideoUrl,
  CloudinaryUrlRaw,
  CloudinaryAudioUrl,
} from './api'

export async function uploadFile(
  file: File,
  fileType: 'normal' | 'raw' = 'normal'
) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', PresetKey)
  const url = fileType === 'normal' ? CloudinaryUrl : CloudinaryUrlRaw
  const response = await axios.post(url, formData)

  return response.data.url as string
}

export async function uploadImage(image: File) {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', PresetKey)

  const response = await axios.post(CloudinaryUrl, formData)

  return response.data.url
}

export async function uploadVideo(video: File) {
  const formData = new FormData()
  formData.append('file', video)
  formData.append('upload_preset', PresetKey)
  formData.append('resource_type', 'video')

  const response = await axios.post(CloudinaryVideoUrl, formData)

  return response.data.url as string
}

export async function uploadAudio(audio: File) {
  const formData = new FormData()
  formData.append('file', audio)
  formData.append('upload_preset', PresetKey)
  formData.append('resource_type', 'audio')

  const response = await axios.post(CloudinaryUrlRaw, formData)

  return response.data.url as string
}
