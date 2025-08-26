import { useParams } from 'react-router'
import {
  LoadingSection,
  LoadingSpinner,
} from '../../components/utils/LoadingSection'
import useGetPosts, { useGetPostById } from '../../hooks/useGetPosts'
import { PostComment } from '../../models/post.model'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAuthContext } from '../../redux/AuthContext'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { OpenAIKey, apiUrl } from '../../utils/api'
import { getAuthToken } from '../../utils/getAuthToken'
import OpenAI from 'openai'

dayjs.extend(relativeTime)

export default function ViewForum() {
  const [comment, setComment] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null) // State for audio URL
  const { id } = useParams()
  const { user } = useAuthContext()
  const { post, loading } = useGetPostById(id!)
  const { posts, loading: allLoading } = useGetPosts()

  useEffect(() => {
    if (post?.description) {
      generateAudio(post.description)
      // setAudioUrl('testing')
    }
  }, [post])

  // Function to generate audio from post description using OpenAI
  async function generateAudio(description: string) {
    try {
      const openai = new OpenAI({
        apiKey: OpenAIKey,
        dangerouslyAllowBrowser: true,
      })

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: description,
      })

      const buffer = await mp3.arrayBuffer()
      const audioBlob = new Blob([buffer], { type: 'audio/mp3' })
      const audioUrl = URL.createObjectURL(audioBlob) // Convert Blob to URL
      setAudioUrl(audioUrl) // Set the audio URL for the audio player
    } catch (error) {
      console.error('Failed to generate audio', error)
      toast.error('Failed to generate audio for post description!')
    }
  }

  if (loading || allLoading) {
    return <LoadingSection />
  }

  // Handle comment submission
  async function handleComment(
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) {
    e.preventDefault()
    setIsCommenting(true)
    try {
      const token = getAuthToken()
      const newComment = { comment, postId: post?._id }
      const response = await axios.post(`${apiUrl}/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const resComment = await response.data
      post?.comments.push(resComment)
      toast.success('Comment added successfully!')
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('Failed to add comment, try again!')
    } finally {
      setIsCommenting(false)
      setComment('')
    }
  }

  return (
    <article className="w-full flex gap-4 justify-between py-12 px-10 md:px-4">
      <section className="w-3/4 sm:w-full mx-auto flex flex-col gap-4 pr-6 border-r-2 border-primary-200/50 sm:border-none sm:pr-0">
        <p className="font-cinzelBold text-4xl md:text-2xl sm:text-xl">
          {post?.title}
        </p>
        <section className="flex items-center gap-2">
          <img
            src={post?.authorId.profilePicture}
            alt=""
            className="rounded-full w-12 h-12 object-cover"
          />
          <div>
            <p className="font-bold">
              {post?.authorId.firstName} {post?.authorId.lastName}
            </p>
            <p className="text-sm">{dayjs(post?.createdAt).fromNow()}</p>
          </div>
        </section>
        <img
          src={post?.photo}
          alt=""
          className="w-full h-[30rem] md:h-80 sm:h-60 object-cover"
        />

        {/* Render AudioPlayer if audioUrl is available */}
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

        <p className="text-lg">{post?.description}</p>

        {post?.audio && (
          <article className="mb-4">
            <p className="font-bold mb-4">Audio Info</p>
            <audio controls className="w-full">
              <source src={post.audio} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </article>
        )}
        {post?.video && (
          <article className="mb-4">
            <p className="font-bold mb-4">Video Info</p>
            <video controls className="w-full">
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </article>
        )}
        <section className="px-20 md:px-14 sm:px-8 mt-10">
          <form onSubmit={handleComment}>
            <div className="flex gap-2 items-center">
              <img
                src={user?.profilePicture}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <textarea
              className="w-full h-24 border border-primary-200 bg-[#FBFADA] outline-none placeholder:text-primary-300/50 text-primary-300 p-2 mt-4"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="bg-primary-400 text-primary-100 py-2 px-12 mt-4 "
              onClick={handleComment}
            >
              {isCommenting ? <LoadingSpinner /> : 'Add Response'}
            </button>
          </form>
          <section className="mt-8">
            <p className="font-bold text-2xl mb-4">Comments</p>
            <section className="flex flex-col gap-4">
              {post?.comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
            </section>
          </section>
        </section>
      </section>
      <aside className="w-1/4 flex flex-col gap-6 sm:hidden">
        <p className="font-cinzelBold text-xl">More Stories</p>
        {posts
          .filter((elt) => elt._id !== id)
          .slice(0, 3)
          .map((post) => (
            <article key={post._id} className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <img
                  src={post.authorId.profilePicture}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <p>
                  {post.authorId.firstName} {post.authorId.lastName}
                </p>
              </div>
              <img
                src={post.photo}
                alt=""
                className="h-40 w-full object-cover object-center"
              />
              <p className="font-cinzelBold text-xl">{post.title}</p>
              <p>{post.description.slice(0, 100)} ....</p>
            </article>
          ))}
      </aside>
    </article>
  )
}

function CommentCard({ comment }: { comment: PostComment }) {
  return (
    <article className="flex gap-4">
      <img
        src={comment.userId.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <section className="flex flex-col gap-2">
        <p className="font-bold">
          {comment.userId.firstName} {comment.userId.lastName}
        </p>
        <p>{comment.comment}</p>
        <p className="text-sm font-bold">
          {dayjs(comment.createdAt).fromNow()}
        </p>
      </section>
    </article>
  )
}

export function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  return (
    <article className="mb-4">
      <p className="font-bold mb-4">Audio</p>
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </article>
  )
}
