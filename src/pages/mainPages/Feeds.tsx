import dayjs from 'dayjs'

import useGetPosts from '../../hooks/useGetPosts'
import { BePost } from '../../models/post.model'
import { LoadingSection } from '../../components/utils/LoadingSection'
import { useNavigate } from 'react-router'
import relativeTime from 'dayjs/plugin/relativeTime'
import useGetEducation from '../../hooks/useGetEducation'
import { useState } from 'react'
import { useAuthContext } from '../../redux/AuthContext'
import FeedAddStory from './FeedAddStory'

dayjs.extend(relativeTime)

export default function Feeds() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { posts, loading } = useGetPosts()
  const { education, loading: eduLoading } = useGetEducation()
  const { user } = useAuthContext()

  const filteredPosts = search
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    : posts

  const navigate = useNavigate()

  if (loading || eduLoading) return <LoadingSection />

  return (
    <article className="flex justify-between gap-4 py-12 px-10 md:px-6 sm:px-4 relative">
      <article className="w-3/4 md:h-4/5 sm:w-full pr-6 sm:pr-0 border-r-2 border-primary-200/50 sm:border-none">
        <div className="flex gap-2 mb-4" onClick={() => setIsModalOpen(true)}>
          <img
            src={user?.profilePicture}
            alt="profile puch"
            className="w-10 h-10 rounded-full bg-red-300"
          />
          <div className="w-full flex flex-col gap-2">
            <div className="w-full bg-primary-200/30 text-primary-300 py-1 px-4 rounded-xl border border-primary-300">
              What Do You Want To Share?
            </div>
            <div className="flex justify-end gap-4 items-center">
              <div className="flex items-center gap-1 bg-primary-400 text-primary-100 py-1 px-4 rounded-lg">
                <img
                  src="/icons/neww.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
                <p>Post</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-cinzelBold text-2xl mb-6">Stories</p>
          <form className="w-1/2">
            <input
              type="text"
              placeholder="Search for stories"
              className="w-full border px-4 py-1 rounded-lg bg-primary-200/25 placeholder:text-primary-300 text-primary-400 border-primary-400/50 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <section className="gap-6 grid grid-cols-2 lg:grid-cols-1">
          {filteredPosts
            .filter((elt) => elt.isApproved)
            .map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
        </section>
      </article>
      <section className="w-1/4 sm:hidden flex flex-col gap-4">
        <p className="font-cinzelBold text-2xl">Education Content</p>
        {education.slice(0, 3).map((post) => {
          return (
            <section
              key={post._id}
              className={`w-full bg-primary-200 h-52 relative`}
              onClick={() => navigate(`/education/${post._id}`)}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
              <div className="w-full h-full bg-primary-400/50 absolute top-0 left-0" />
              <div className="w-full h-1/2 bg-gradient-to-t p-4 from-primary-400 to-transparent  absolute bottom-0 left-0">
                <p className="text-primary-100 text-sm font-bold">
                  {post.title}
                </p>
                <p className="text-primary-100 text-sm ">
                  {post.description.slice(0, 100)}
                </p>
              </div>
            </section>
          )
        })}
      </section>
      {isModalOpen && (
        <section
          className="w-full h-screen grid place-content-center fixed top-0 left-0 bg-primary-400/90"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="h-fit px-6 mx-auto bg-primary-100 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <FeedAddStory hide />
          </div>
        </section>
      )}
    </article>
  )
}

export function PostCard(post: BePost) {
  const navigate = useNavigate()
  return (
    <article
      className="p-4 rounded-xl cursor-pointer bg-primary-200/30"
      onClick={() => navigate(`/feeds/${post._id}`)}
    >
      <div className="flex items-center gap-2">
        <img
          src={post.authorId.profilePicture}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-bold">
            {post.authorId.firstName} {post.authorId.lastName}
          </p>

          <p className="text-sm text-primary-300">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <p className="font-cinzelBold text-x my-4">{post.title}</p>
      <img src={post.photo} className="w-full object-cover h-80 mb-4" alt="" />
      <p>{post.description.slice(0, 250)}...</p>
      <div>
        <div className="flex items-center gap-1 my-2">
          <img
            src="/icons/comm.png"
            className="w-5 h-5 object-contain"
            alt=""
          />
          {post.comments.length}
        </div>
      </div>
    </article>
  )
}
