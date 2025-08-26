import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../redux/AuthContext'
import { apiUrl } from '../../utils/api'
import { getAuthToken } from '../../utils/getAuthToken'
import { uploadImage } from '../../utils/uploadImage'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '../../components/utils/LoadingSection'

export default function SettingsPage() {
  const { user, login } = useAuthContext()
  const navigate = useNavigate()

  const [currentUserInfo, setCurrentUserInfo] = useState({
    _id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    password: '',
    profilePicture: user?.profilePicture,
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    resetForm() // Initialize form with user data
  }, [user])

  function resetForm() {
    setCurrentUserInfo({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      password: '',
      profilePicture: user?.profilePicture,
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const token = getAuthToken()
      const photoUrl = photo
        ? await uploadImage(photo)
        : currentUserInfo.profilePicture
      const updatedUserInfo = { ...currentUserInfo, profilePicture: photoUrl }

      const response = await axios.put(
        `${apiUrl}/users/${currentUserInfo._id}`,
        updatedUserInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (response.status !== 200) {
        throw new Error('Failed to update profile')
      }

      toast.success('Profile updated successfully')
      login(response.data) // Update the user context
      navigate('/profile')
    } catch (error) {
      toast.error('An error occurred')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setCurrentUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPhoto(file)
      setCurrentUserInfo((prev) => {
        const reader = new FileReader()
        reader.onload = () => {
          prev.profilePicture = reader.result as string
        }
        reader.readAsDataURL(file)
        return {
          ...prev,
        }
      })
    }
  }

  return (
    <article className="p-12 px-10 md:px-8 sm:px-4">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <article className="flex justify-between gap-8 sm:flex-col">
        <section className="min-w-fit flex flex-col gap-2 items-center">
          <img
            src={currentUserInfo.profilePicture}
            className="w-44 h-44 md:w-32 md:h-32 rounded-full object-cover"
          />
          <p className="font-semibold text-xl">
            {currentUserInfo.firstName + ' ' + currentUserInfo.lastName}
          </p>
          <p>{currentUserInfo.email}</p>
        </section>
        <section className="bg-primary-200 w-4/5 rounded-2xl md:w-full">
          <h1 className="text-2xl font-bold p-8">Update Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-8">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={currentUserInfo.firstName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={currentUserInfo.lastName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={currentUserInfo.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={currentUserInfo.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={currentUserInfo.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-xl bg-primary-100/20 outline-none"
              />

              <section className="flex justify-between gap-12 mt-8">
                <button
                  type="submit"
                  className="bg-mainGreen text-white bg-primary-400 p-2 rounded-md w-full"
                >
                  {isLoading ? <LoadingSpinner /> : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="bg-mainGreen text-primary-400 bg-primary-100 p-2 rounded-md w-full"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </section>
            </div>
          </form>
        </section>
      </article>
    </article>
  )
}
