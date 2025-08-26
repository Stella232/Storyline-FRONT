import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Loading from 'react-loading'
import { UserLogin } from '../../models/user.model'
import { useAuthContext } from '../../redux/AuthContext'
import logUser from '../../utils/logUser'

export default function AdminPortal() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [error, setError] = useState(false)
  const { register, handleSubmit } = useForm<UserLogin>()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(formData: UserLogin) {
    setIsLoading(true)
    try {
      const user = await logUser(formData)

      if (!user.isAdmin && !user.isExpert) {
        toast.error('Not Authorized')
        return
      }

      login({ user, token: user.token })
      return user.isAdmin
        ? navigate('/admin')
        : navigate('/expert/manage-education')
    } catch (error) {
      setError(true)
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="rela flex flex-col justify-center items-center h-screen">
      <section className="w-1/2 relative flex justify-center py-12 items-center z-30 bg-primary-100">
        <form
          className="w-1/2 flex flex-col gap-5 z-10"
          onSubmit={handleSubmit(handleLogin)}
        >
          <p className="font-cinzelBold text-3xl">Admin portal</p>

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
            <input
              className="bg-greenL/0 border border-primary-300 bg-primary-300/20 placeholder:text-primary-400 rounded-lg px-4 py-1 outline-none"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
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
        </form>
      </section>
      <img
        src="/images/auth.jpg"
        onClick={() => navigate('/')}
        alt=""
        className="h-full w-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="bg-primary-400/60 w-full h-full absolute top-0 left-0 padd py-10">
        <p className="font-bold font-cinzelBold text-3xl z-20 text-primary-100">
          StoryLine
        </p>
      </div>
    </article>
  )
}
