import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { PostModel } from '../../models/post.model'
import toast from 'react-hot-toast'
import { getAuthToken } from '../../utils/getAuthToken'
import { uploadFile, uploadVideo, uploadAudio } from '../../utils/uploadImage'
import axios from 'axios'
import { apiUrl } from '../../utils/api'
import { LoadingSpinner } from '../../components/utils/LoadingSection'

export default function AddStory({ hide }: { hide?: boolean }) {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<PostModel>()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  async function handleAddStory(formData: PostModel) {
    if (!imageFile) {
      toast.error('Please add an image')
      return
    }
    setIsLoading(true)
    try {
      const token = getAuthToken()
      const photoUrl = await uploadFile(imageFile)
      const videoUrl = videoFile ? await uploadVideo(videoFile) : ''
      const audioUrl = audioFile ? await uploadAudio(audioFile) : ''
      const newPost = {
        ...formData,
        photo: photoUrl,
        video: videoUrl,
        audio: audioUrl,
      }
      const response = await axios.post(`${apiUrl}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status !== 201) {
        throw new Error('An error occurred')
      }
      toast.success('Story created successfully')
      navigate('/feeds')
    } catch (error) {
      toast.error('An error occurred')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    handleFile(file)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  function handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleVideoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setVideoFile(file)
    }
  }

  function handleAudioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  function handleRemoveImage() {
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <article className="h-96 w-3/5 md:h-4/5 sm:w-full sm:px-4 py-12 mx-auto">
      <p className="font-cinzelBold text-2xl mb-6">Create New Story</p>
      <form onSubmit={handleSubmit(handleAddStory)}>
        <input
          type="text"
          {...register('title')}
          placeholder="Title"
          className="w-full bg-primary-200/20 outline-none placeholder:text-5xl text-5xl py-2 px-2 font-bold text-primary-300 placeholder:text-primary-300/45"
        />
        <textarea
          {...register('description')}
          placeholder="Tell your story ..."
          className="w-full bg-primary-200/20 outline-none px-2 py-2 text-primary-300 placeholder:text-primary-300/45 text-xl min-h-40"
        ></textarea>

        <div
          className="upload-container relative flex items-center justify-between w-full bg-primary-200/20"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <div
            className="drop-area w-full rounded-md border-2 border-dotted border-gray-200 transition-all hover:border-primary-200 text-center"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <label
              htmlFor="file-input"
              className="block w-full h-full text-gray-500 p-4 text-sm cursor-pointer"
            >
              Drop your image here or click to browse
            </label>
            <input
              name="file"
              type="file"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            {imagePreview && (
              <div className="preview-container flex flex-col items-center">
                <div
                  className="preview-image w-36 h-36 bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${imagePreview})` }}
                ></div>
                <span className="file-name my-4 text-sm font-medium">
                  {imageFile?.name}
                </span>
                <p
                  className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border text-xs text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleRemoveImage}
                >
                  Delete
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-0 mt-6">
          <p>Add a video (optional)</p>
          <input
            name="file"
            type="file"
            id="video-input"
            accept="video/*"
            className="w-full border-2 border-dotted border-gray-200 rounded-md p-2"
            placeholder="Add a video (optional)"
            onChange={handleVideoChange}
          />
        </div>
        <div className="flex flex-col gap-0 mt-6">
          <p>Add an audio (optional)</p>
          <input
            name="file"
            type="file"
            id="audio-input"
            accept="audio/*"
            className="w-full border-2 border-dotted border-gray-200 rounded-md p-2"
            placeholder="Add an audio (optional)"
            onChange={handleAudioChange}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-400 text-primary-100 font-cinzelBold py-2 px-10 rounded-lg mt-4"
        >
          {isLoading ? <LoadingSpinner /> : 'Create Story'}
        </button>
      </form>
      {!hide && (
        <section className="py-8">
          "Share your unique experiences with the world! Whether it's about the
          places you've visited, the food that has delighted your taste buds,
          the friends who have shaped your journey, or stories from your
          hometown, Storryline is your space to express and connect. Every story
          matters—let yours inspire others!"
        </section>
      )}
    </article>
  )
}
