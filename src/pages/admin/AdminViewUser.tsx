import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useGetPosts from '../../hooks/useGetPosts'
import { useNavigate, useParams } from 'react-router'
import { LoadingSection } from '../../components/utils/LoadingSection'
import { getAuthToken } from '../../utils/getAuthToken'
import axios from 'axios'
import toast from 'react-hot-toast'
import { apiUrl } from '../../utils/api'
import SlButton from '../../components/utils/SlButton'
import { useGetUser } from '../../hooks/useGetUsers'
import { useState } from 'react'

dayjs.extend(relativeTime)

export default function AdminViewUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { id } = useParams()
  const { user, loading: userLoading } = useGetUser(id!)
  const { posts, loading } = useGetPosts()
  const navigate = useNavigate()
  const token = getAuthToken()

  if (loading || userLoading) {
    return <LoadingSection />
  }

  async function handleEdit(isAdmin?: boolean) {
    setIsLoading(true)
    const role = isAdmin ? 'admin' : 'expert'
    toast.loading(`Updating user to ${role}`, { duration: 1000 })
    try {
      await axios.patch(
        `${apiUrl}/user/${user?._id}`,
        {
          admin: isAdmin ? true : user?.isAdmin,
          expert: !isAdmin ? true : user?.isExpert,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success(`User is now an ${role}`)
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function removeRole(isAdmin?: boolean) {
    setIsLoading(true)
    const role = isAdmin ? 'admin' : 'expert'
    toast.loading(`Updating user to ${role}`, { duration: 1000 })
    try {
      await axios.patch(
        `${apiUrl}/user/${user?._id}`,
        {
          admin: isAdmin ? false : user?.isAdmin,
          expert: !isAdmin ? false : user?.isExpert,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success(`User is no longer a ${role}`)
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function disableUser() {
    setIsDeleting(true)
    try {
      await axios.delete(`${apiUrl}/user/${user?._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('User deleted')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <div className="p-8">
      <div className="flex flex-wrap">
        <section className="w-full">
          <div className="bg-[url(/hero.webp)] bg-cover bg-center h-1/3 grid place-content-center">
            <div className="relative h-32 w-40">
              <img
                src={user?.profilePicture}
                className="min-w-40 min-h-40 h-40 w-40 rounded-full object-cover absolute -bottom-20"
                alt=""
              />
            </div>
          </div>
          <div className="bg-primary-200 flex flex-col justify-center items-center pt-24 pb-10">
            <p className="font-semibold text-2xl">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-lg">{user?.email}</p>
            <div className="flex flex-row gap-5 mt-6">
              <SlButton
                text={user?.isAdmin ? 'Remove Admin' : 'Make Admin'}
                onClick={
                  user?.isAdmin
                    ? () => removeRole(true)
                    : () => handleEdit(true)
                }
                variant="primary"
                loading={isLoading}
              />
              <SlButton
                text={user?.isExpert ? 'Remove expert' : 'Make Expert'}
                onClick={
                  user?.isExpert
                    ? () => removeRole(false)
                    : () => handleEdit(false)
                }
                variant="tertiary"
                loading={isLoading}
              />
              <SlButton
                text="Disable User"
                onClick={disableUser}
                variant="warn"
                loading={isDeleting}
              />
            </div>
          </div>
        </section>
        <section className="flex w-full gap-6 my-4 ">
          <div className="flex flex-col w-1/4">
            <div className="w-full flex flex-col">
              <PersonalInfo
                names={user?.firstName + ' ' + user?.lastName}
                joined={dayjs().fromNow()}
                mobile={user?.phone}
                email={user?.email}
              />
            </div>
          </div>
          <section className="w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-xl text-gray-900 font-cinzelBold">
                Your Posts
              </h4>
            </div>
            {loading ? (
              <LoadingSection />
            ) : posts.filter((post) => post.authorId._id === user?._id)
                .length === 0 ? (
              <section className="w-full h-96 grid place-content-center">
                <p className="font-semibold text-xl w-full text-center mb-5 ">
                  No Post Yet
                </p>
                <SlButton
                  text="Add New Story"
                  onClick={() => navigate('/new-story')}
                />
              </section>
            ) : (
              <section className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                {posts
                  .filter((post) => post.authorId._id === user?._id)
                  .map((post) => (
                    <PostCard post={post} />
                  ))}
              </section>
            )}
          </section>
        </section>
      </div>
    </div>
  )
}

interface PersonalInfoProps {
  names: string | undefined
  joined: string | undefined
  mobile: string | undefined
  email: string | undefined
}

function PersonalInfo({ names, joined, mobile, email }: PersonalInfoProps) {
  return (
    <div className="flex-1 px-10 bg-primary-200 rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Full name:</span>
          <span className="text-gray-700">{names}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Joined:</span>
          <span className="text-gray-700">{joined}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Mobile:</span>
          <span className="text-gray-700">{mobile}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Email:</span>
          <span className="text-gray-700">{email}</span>
        </li>
      </ul>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const token = getAuthToken()
  const navigate = useNavigate()

  function editPost() {
    navigate(`/feeds/${post._id}/edit`)
  }
  async function deletePost() {
    await axios.delete(`${apiUrl}/posts/${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast.success('Post deleted successfully')
    window.location.reload()
  }

  return (
    <section className="relative">
      <div className="bg-primary-200 h-52 relative">
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="w-full h-full bg-primary-400/50 absolute top-0 left-0" />
        <div className="w-full h-1/2 bg-gradient-to-t p-4 from-primary-400 to-transparent  absolute bottom-0 left-0">
          <p className="text-primary-100 text-sm font-bold">{post.title}</p>
          <p className="text-primary-100 text-sm ">
            {post.description.slice(0, 100)}
          </p>
        </div>
      </div>
      <div className="w-full py-2 absolute top-0 right-0 flex justify-end gap-3 pr-4">
        <img
          src="/icons/edit.png"
          className="w-5 h-5 object-cover cursor-pointer"
          onClick={editPost}
          alt=""
        />
        <img
          src="/icons/bin.png"
          className="w-5 h-5 object-cover cursor-pointer"
          onClick={deletePost}
          alt=""
        />
      </div>
    </section>
  )
}
