import { LoadingSection } from '../../components/utils/LoadingSection'
import useGetEducation from '../../hooks/useGetEducation'
import { EducationModel } from '../../models/education.model'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../redux/AuthContext'

export default function AdminEducation() {
  const { education, loading } = useGetEducation()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  if (loading) return <LoadingSection />

  return (
    <article>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-cinzelBold text-3xl mb-6">
          Manage Education Content
        </h1>
        <button
          onClick={() =>
            navigate(
              user?.isAdmin
                ? '/admin/manage-education/add'
                : '/expert/manage-education/add'
            )
          }
          className="bg-primary-400 text-primary-100 p-2 px-6 rounded"
        >
          Add New
        </button>
      </div>
      <section>
        <article className="flex flex-col">
          {education.map((post) => (
            <StoryCard key={post._id} post={post} />
          ))}
        </article>
      </section>
    </article>
  )
}

function StoryCard({ post }: { post: EducationModel }) {
  const navigate = useNavigate()

  function navigateToContent() {
    navigate(`/expert/manage-education/${post._id}`)
  }

  return (
    <article className="border border-primary-400 bg-primary-100 p-4 mb-4 flex flex-col gap-4">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <h2 className="font-bold text-xl mt-2">{post.title}</h2>
      <p>{post.description}</p>
      <section className="flex gap-4 mt-2">
        <button
          onClick={navigateToContent}
          className="bg-primary-400 text-primary-100 p-2 rounded w-full"
        >
          View More
        </button>
      </section>
    </article>
  )
}
