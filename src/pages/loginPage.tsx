import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../redux/AuthContext'
import { useState } from 'react'
import { UserLogin } from '../models/user.model'
import logUser from '../utils/logUser'
import Loading from 'react-loading'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [error, setError] = useState(false)
  const { register, handleSubmit } = useForm<UserLogin>()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  async function handleLogin(formData: UserLogin) {
    setIsLoading(true)
    try {
      const user = await logUser(formData)
      login({ user, token: user.token })
      if (user.isAdmin) {
        navigate('/admin/manage-users')
        return
      }
      navigate('/home')
    } catch (error) {
      setError(true)
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="relative flex flex-col justify-center items-center h-screen">
      <section className="w-1/2 padd py-10 sm:w-11/12 relative flex justify-between items-center z-30 bg-primary-100">
        <form
          className="w-full flex flex-col gap-5 z-10"
          onSubmit={handleSubmit(handleLogin)}
        >
          <p className="font-cinzelBold text-3xl">Log In</p>

          <label className="flex flex-col gap-1 w-full">
            Email
            <input
              className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
          </label>

          <label className="flex flex-col gap-1 w-full">
            Password
            <div className="relative w-full">
              <input
                className="bg-greenL/0 w-full border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
              />
              <button
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  setIsPasswordVisible((prev) => !prev)
                }}
              >
                <div className="absolute top-[20%] right-2">
                  {isPasswordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
                </div>
              </button>
            </div>
          </label>
          <button
            className="bg-primary-400 hover:bg-primary-400/95 text-primary-100
                  py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium"
          >
            {isLoading ? (
              <Loading type="spin" color="#FBFADA" height={30} width={30} />
            ) : (
              'Login'
            )}
          </button>
          {error && <p className="text-red-500">Invalid email or password</p>}
          <p className="text-center text-primary-400">
            Already have an account?{' '}
            <span
              className="text-primary-400 cursor-pointer font-cinzelBold text-lg underline"
              onClick={() => navigate('/signup')}
            >
              Signup
            </span>
          </p>
          <span
            className="text-primary-400 cursor-pointer font-semibold text-sm text-center hover:underline"
            onClick={() => navigate('/change-password')}
          >
            Forgot Password?
          </span>
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
