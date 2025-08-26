import { useNavigate } from 'react-router'
import { EducationModel } from '../../models/education.model'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { uploadImage } from '../../utils/uploadImage'
import axios from 'axios'
import { getAuthToken } from '../../utils/getAuthToken'
import { apiUrl } from '../../utils/api'
import Loading from 'react-loading'

export default function AddEducation() {
  const [isLoading, setIsLoading] = useState(false)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const { register, handleSubmit } = useForm<EducationModel>()
  const navigate = useNavigate()

  async function handleAddEducation(formData: EducationModel) {
    console.log(formData)
    setIsLoading(true)
    try {
      const token = getAuthToken()
      const coverImageUrl = await uploadImage(coverImage!)

      const education: EducationModel = {
        ...formData,
        coverImage: coverImageUrl,
        year: Number(String(formData?.year).split('-')[0]),
      }

      const response = await axios.post(`${apiUrl}/education`, education, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 201) {
        toast.success('Education content added successfully')
        navigate('/expert/manage-education')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to add education content')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article>
      <form
        onSubmit={handleSubmit(handleAddEducation)}
        className="flex flex-col gap-8 w-3/6 mx-auto md:w-full"
      >
        <section>
          <h1 className="font-cinzelBold text-xl">Education Content</h1>
          <div className="flex gap-5">
            <label className="flex flex-col gap-1 w-full">
              Title
              <input
                className="border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="Enter your title"
                {...register('title')}
              />
            </label>
            <label className="flex flex-col gap-1 w-full">
              Year
              <input
                className="border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type="date"
                placeholder="Enter your title"
                {...register('year')}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 w-full">
            Description
            <textarea
              className="border border-primary-300 h-40 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
              placeholder="Enter your description"
              {...register('description')}
            />
          </label>
          <label className="flex flex-col gap-1 w-full">
            More
            <textarea
              className="border border-primary-300 h-40 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
              placeholder="Enter your more"
              {...register('more')}
            />
          </label>
          <div className="flex gap-5">
            <label className="flex flex-col gap-1 w-full">
              District
              <input
                className="border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="Enter your continent"
                {...register('district')}
              />
            </label>
          </div>
          <div className="flex gap-5">
            <label className="flex flex-col gap-1 w-full">
              Cover Image
              <input
                className="border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type="file"
                placeholder="Enter your images"
                onChange={(e) => setCoverImage(e.target.files![0])}
              />
            </label>
            <label className="flex flex-col gap-1 w-full">
              Youtube Links
              <input
                className="border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="Enter your youtube links"
                {...register('youtubeLinks')}
              />
            </label>
          </div>
        </section>
        <button className="bg-primary-400 hover:bg-primary-400/95 text-primary-100 py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium">
          {isLoading ? (
            <Loading type="spin" color="#FBFADA" width={25} height={25} />
          ) : (
            'Create Content'
          )}
        </button>
      </form>
    </article>
  )
}
