import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Loading from 'react-loading'
import axios from 'axios'
import { apiUrl } from '../utils/api'
import { getAuthToken } from '../utils/getAuthToken'

export default function ChangePasswordPage() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValidated, setIsValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const token = getAuthToken()

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !confirmPassword) {
      toast.error('All fields are required')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${apiUrl}/auth/change`,
        {
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        toast.success('Password changed successfully')
        navigate('/login')
      } else {
        toast.error('An error occurred, please try again')
      }
    } catch (error) {
      setError(true)
      toast.error('An error occurred, please try again')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleValidate(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      toast.error('Email is required')
      return
    }
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${apiUrl}/auth/validate`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 200) {
        setIsValidated(true)
        toast.success('Email Validated')
      } else {
      }
    } catch (error) {
      setError(true)
      toast.error('Email not found')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="relative flex flex-col justify-center items-center h-screen">
      <section className="w-1/2 padd py-10 sm:w-11/12 relative flex justify-between items-center z-30 bg-primary-100">
        <form className="w-full flex flex-col gap-5 z-10">
          <p className="font-cinzelBold text-3xl">Change Password</p>

          <label className="flex flex-col gap-1 w-full">
            Email
            <input
              className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {isValidated && (
            <>
              <label className="flex flex-col gap-1 w-full">
                Password
                <input
                  className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1 w-full">
                Confirm Password
                <input
                  className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </>
          )}
          <button
            className="bg-primary-400 hover:bg-primary-400/95 text-primary-100
                  py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium"
            onClick={isValidated ? handleChangePassword : handleValidate}
          >
            {isLoading ? (
              <Loading type="spin" color="#FBFADA" height={30} width={30} />
            ) : isValidated ? (
              'Change Password'
            ) : (
              'Validate Email'
            )}
          </button>
          {error && <p className="text-red-500">Invalid email or password</p>}
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
