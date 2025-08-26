import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { UserSignup } from '../models/user.model'
import { signupUser } from '../utils/logUser'
import { uploadImage } from '../utils/uploadImage'
import Loading from 'react-loading'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, handleSubmit } = useForm<UserSignup>()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    address: false,
    occupation: false,
    profilePicture: false,
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  async function handleSignup(formData: UserSignup) {
    if (!validateEmail(formData.email)) {
      return
    }

    if (!validatePassword(formData.password)) {
      return
    }

    if (!validateUserInfo(formData)) {
      return
    }

    if (!image) {
      return
    }

    setIsLoading(true)

    try {
      const imageUrl = await uploadImage(image)
      await signupUser({
        ...formData,
        profilePicture: imageUrl,
        confirmPassword: formData.password,
      })
      navigate('/login')
    } catch (error) {
      setError(true)
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  function validateUserInfo(formData: UserSignup) {
    let isValid = true
    if (!formData.firstName) {
      setFormError((prev) => ({ ...prev, firstName: true }))
      isValid = false
    }
    if (!formData.lastName) {
      setFormError((prev) => ({ ...prev, lastName: true }))
      isValid = false
    }
    if (!formData.phone) {
      setFormError((prev) => ({ ...prev, phone: true }))
      isValid = false
    }
    if (!formData.address) {
      setFormError((prev) => ({ ...prev, address: true }))
      isValid = false
    }
    if (!formData.occupation) {
      setFormError((prev) => ({ ...prev, occupation: true }))
      isValid = false
    }
    if (!image) {
      setFormError((prev) => ({ ...prev, profilePicture: true }))
      isValid = false
    }
    return isValid
  }

  function validateEmail(email: string) {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address')
      toast.error('Please enter a valid email address')
      return false
    }
    if (!email.includes('.')) {
      setEmailError('Please enter a valid email address')
      toast.error('Please enter a valid email address')
      return false
    }
    if (email.includes(' ')) {
      setEmailError('Email must not contain spaces')
      toast.error('Email must not contain spaces')
      return false
    }
    return true
  }

  function validatePassword(password: string) {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      toast.error('Password must be at least 6 characters long')
      return false
    }
    if (password.includes(' ')) {
      setPasswordError('Password must not contain spaces')
      toast.error('Password must not contain spaces')
      return false
    }
    if (!password.match(/[a-z]/g)) {
      setPasswordError('Password must contain at least one lowercase letter')
      toast.error('Password must contain at least one lowercase letter')
      return false
    }
    if (!password.match(/[A-Z]/g)) {
      setPasswordError('Password must contain at least one uppercase letter')
      toast.error('Password must contain at least one uppercase letter')
      return false
    }
    if (!password.match(/[0-9]/g)) {
      setPasswordError('Password must contain at least one number')
      toast.error('Password must contain at least one number')
      return false
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      toast.error('Passwords do not match')
      return false
    }
    return true
  }

  return (
    <article className="relative flex flex-col justify-center items-center h-screen sm:h-fit">
      <section className="w-1/2 sm:w-11/12 py-6 padd relative flex justify-between items-center z-30 bg-primary-100 sm:my-32">
        <form
          className="w-full flex flex-col gap-5 z-10"
          onSubmit={handleSubmit(handleSignup)}
        >
          <p className="font-cinzelBold text-3xl">Sign Up</p>

          <div className="flex gap-4 z-30 sm:flex-col">
            <label className="flex flex-col gap-1 w-full z-30">
              <div className="w-fit relative">
                <p className="w-fit">First Name</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="i.e. John"
                {...register('firstName')}
                onChange={() =>
                  setFormError((prev) => ({ ...prev, firstName: false }))
                }
              />
              {formError.firstName && (
                <p className="text-red-500 text-xs">required field</p>
              )}
            </label>
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Last Name</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>{' '}
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="i.e. Doe"
                {...register('lastName')}
                onChange={() =>
                  setFormError((prev) => ({ ...prev, lastName: false }))
                }
              />
              {formError.lastName && (
                <p className="text-red-500 text-xs">required field</p>
              )}
            </label>
          </div>
          <div className="flex gap-4 sm:flex-col">
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Email</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>{' '}
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="email"
                placeholder="i.e. johndoe@example.com"
                {...register('email')}
                onChange={() => setEmailError('')}
              />
              {emailError && (
                <p className="text-red-500 text-xs">{emailError}</p>
              )}
            </label>
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Phone</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="i.e. 250788888888"
                {...register('phone')}
                onChange={() =>
                  setFormError((prev) => ({ ...prev, phone: false }))
                }
              />
              {formError.phone && (
                <p className="text-red-500 text-xs">required field</p>
              )}
            </label>
          </div>
          <div className="flex gap-4 sm:flex-col">
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Address</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="i.e. Kigali, Rwandda"
                {...register('address')}
                onChange={() =>
                  setFormError((prev) => ({ ...prev, address: false }))
                }
              />
              {formError.address && (
                <p className="text-red-500 text-xs">required field</p>
              )}
            </label>
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Occupation</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <input
                className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                type="text"
                placeholder="i.e. Software Engineer"
                {...register('occupation')}
                onChange={() =>
                  setFormError((prev) => ({ ...prev, occupation: false }))
                }
              />
              {formError.occupation && (
                <p className="text-red-500 text-xs">required field</p>
              )}
            </label>
          </div>
          <label className="flex flex-col gap-1 w-full">
            <div className="w-fit relative">
              <p className="w-fit">Profile Picture</p>
              <p className="text-red-500 text-xs absolute top-1 -right-3">*</p>
            </div>{' '}
            <input
              className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
              type="file"
              accept="image/*"
              placeholder="Enter your profile picture"
              onChange={(e) => {
                setFormError((prev) => ({ ...prev, profilePicture: false }))
                setImage(e.target.files?.[0] || null)
              }}
            />
            {formError.profilePicture && (
              <p className="text-red-500 text-xs">required field</p>
            )}
          </label>
          <div className="flex gap-4 sm:flex-col">
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Password</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <div className="relative w-full">
                <input
                  className="bg-greenL/0 border w-full border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  onChange={() => setPasswordError('')}
                />
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsPasswordVisible((prev) => !prev)
                  }}
                >
                  <div className="absolute top-[20%] right-2">
                    {isPasswordVisible ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </div>
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError}</p>
              )}
            </label>
            <label className="flex flex-col gap-1 w-full">
              <div className="w-fit relative">
                <p className="w-fit">Confirm password</p>
                <p className="text-red-500 text-xs absolute top-1 -right-3">
                  *
                </p>
              </div>
              <div className="relative w-full">
                <input
                  className="bg-greenL/0 border w-full border-primary-300 bg-primary-300/20 placeholder:text-primary-300/60 placeholder:text-sm rounded-lg px-4 py-1 outline-none"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPasswordError('')
                    setConfirmPassword(e.target.value)
                  }}
                />
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsConfirmPasswordVisible((prev) => !prev)
                  }}
                >
                  <div className="absolute top-[20%] right-2">
                    {isConfirmPasswordVisible ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </div>
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs">{confirmPasswordError}</p>
              )}
            </label>
          </div>
          <button
            className="bg-primary-400 hover:bg-primary-400/95 text-primary-100
                  py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium"
          >
            {isLoading ? (
              <Loading type="spin" color="#FBFADA" height={30} width={30} />
            ) : (
              'Signup'
            )}
          </button>
          {error && (
            <p className="text-red-500">Some Info are missing, Try Again!</p>
          )}
          <p className="text-center text-primary-400">
            Already have an account?{' '}
            <span
              className="text-primary-400 cursor-pointer font-cinzelBold text-lg underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
        <div className="w-full h-full absolute top-0 left-0 flex justify-between z-0">
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
          <div className="w-1/5 h-full border-r-2 border-primary-400/10 z-0"></div>
        </div>
      </section>
      <img
        src="/images/auth.jpg"
        onClick={() => navigate('/')}
        alt=""
        className="h-full w-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="bg-primary-400/50 w-full h-full absolute top-0 left-0 padd py-10">
        <p
          className="font-bold font-cinzelBold text-3xl z-20 text-primary-100 cursor-pointer"
          onClick={() => navigate('/')}
        >
          StoryLine
        </p>
      </div>
    </article>
  )
}
