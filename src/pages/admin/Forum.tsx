import axios from 'axios'
import {
  LoadingSection,
  LoadingSpinner,
} from '../../components/utils/LoadingSection'
import useGetPosts from '../../hooks/useGetPosts'
import { BePost } from '../../models/post.model'
import { apiUrl } from '../../utils/api'
import { getAuthToken } from '../../utils/getAuthToken'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function AdminForumPage() {
  const { posts, loading } = useGetPosts()
  const [postTypes, setPostTypes] = useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('all')

  if (loading) return <LoadingSection />

  const filteredPosts = posts.filter((post) => {
    if (postTypes === 'all') return true
    if (postTypes === 'pending') return !post.isApproved && !post.isRejected
    if (postTypes === 'approved') return post.isApproved
    if (postTypes === 'rejected') return post.isRejected
    return true
  })

  return (
    <article>
      <h1 className="font-cinzelBold text-3xl mb-6">Manage Stories</h1>
      <section className="flex gap-4 border-b border-primary-400 pb-4">
        <button
          onClick={() => setPostTypes('all')}
          className={`${
            postTypes === 'all'
              ? 'bg-primary-400 text-primary-100'
              : 'bg-primary-100'
          } p-2 px-8 rounded`}
        >
          All
        </button>
        <button
          onClick={() => setPostTypes('pending')}
          className={`${
            postTypes === 'pending'
              ? 'bg-primary-400 text-primary-100'
              : 'bg-primary-100'
          } p-2 px-8 rounded`}
        >
          Pending
        </button>
        <button
          onClick={() => setPostTypes('approved')}
          className={`${
            postTypes === 'approved'
              ? 'bg-primary-400 text-primary-100'
              : 'bg-primary-100'
          } p-2 px-8 rounded`}
        >
          Approved
        </button>
        <button
          onClick={() => setPostTypes('rejected')}
          className={`${
            postTypes === 'rejected'
              ? 'bg-primary-400 text-primary-100'
              : 'bg-primary-100'
          } p-2 px-8 rounded`}
        >
          Rejected
        </button>
      </section>
      <h1 className="font-cinzelBold text-3xl my-6">
        {postTypes === 'all'
          ? 'All'
          : postTypes === 'pending'
            ? 'Pending'
            : postTypes === 'approved'
              ? 'Approved'
              : 'Rejected'}{' '}
        Stories
      </h1>
      <section>
        {filteredPosts.length === 0 ? (
          <article className="w-full h-80 grid place-content-center text-xl">
            <p>
              No{' '}
              {postTypes === 'all'
                ? ''
                : postTypes === 'pending'
                  ? 'Pending'
                  : postTypes === 'approved'
                    ? 'Approved'
                    : 'Rejected'}{' '}
              Stories
            </p>
          </article>
        ) : (
          <article className="flex flex-col">
            {filteredPosts.map((post) => (
              <StoryCard key={post._id} post={post} />
            ))}
          </article>
        )}
      </section>
    </article>
  )
}

function StoryCard({ post }: { post: BePost }) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const token = getAuthToken()

  async function approveStory() {
    setIsApproving(true)
    try {
      await axios.patch(`${apiUrl}/posts/${post._id}/approve`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Story approved')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsApproving(false)
    }
  }

  async function rejectStory() {
    setIsRejecting(true)
    try {
      await axios.patch(`${apiUrl}/posts/${post._id}/reject`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Story rejected')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsRejecting(false)
    }
  }

  async function deleteStory() {
    setIsDeleting(true)
    try {
      await axios.delete(`${apiUrl}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Story deleted')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <article className="border border-primary-400 bg-primary-100 p-4 mb-4">
      <img
        src={post.photo}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <h2 className="font-bold text-xl mt-2">{post.title}</h2>
      <p>{post.description}</p>
      <section className="flex gap-4 mt-2">
        <button
          onClick={approveStory}
          disabled={isApproving}
          className={`bg-green-500 text-primary-100 p-2 rounded w-2/4 ${post.isApproved ? 'hidden' : ''}`}
        >
          {isApproving ? <LoadingSpinner /> : 'Approve'}
        </button>
        <button
          onClick={rejectStory}
          disabled={isRejecting}
          className={`bg-red-500 text-primary-100 p-2 rounded w-1/2 ${post.isRejected ? 'hidden' : ''}`}
        >
          {isRejecting ? <LoadingSpinner /> : 'Reject'}
        </button>
        <button
          onClick={deleteStory}
          disabled={isDeleting}
          className="bg-red-500 text-primary-100 p-2 rounded w-1/2"
        >
          {isDeleting ? <LoadingSpinner /> : 'Delete'}
        </button>
      </section>
    </article>
  )
}
