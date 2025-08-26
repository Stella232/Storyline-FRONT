import { useNavigate } from 'react-router'
import { EducationModel } from '../../models/education.model'
import useGetEducation from '../../hooks/useGetEducation'
import { LoadingSection } from '../../components/utils/LoadingSection'
import Carousel from '../../components/Slider'
import SlButton from '../../components/utils/SlButton'
import { useAuthContext } from '../../redux/AuthContext'
import { useMemo, useState } from 'react'

export default function Education() {
  const [search, setSearch] = useState('')
  const { education, loading } = useGetEducation()
  const [year, setYear] = useState<any>('All')

  const filteredPosts = useMemo(() => {
    return education.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesYear = year === 'All' || post?.year?.toString() === year
      return matchesSearch && matchesYear
    })
  }, [search, education, year])

  return (
    <article className="pb-12 flex flex-col gap-4">
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          <Carousel slidesDatas={education.slice(0, 5)} />
          <div className="flex justify-between px-10 md:flex-col md:w-full md:px-4">
            <p className="font-cinzelBold text-2xl mb-6">Education Content</p>
            <div className="w-1/2 md:w-full flex flex-col gap-4 justify-end items-end">
              <form className="w-full">
                <input
                  type="text"
                  placeholder="Search for Education content"
                  className="w-full border px-4 py-1 rounded-lg bg-primary-200/25 placeholder:text-primary-300 text-primary-400 border-primary-400/50 outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <select
                name="year"
                id="year"
                onChange={(e) => setYear(e.target.value)}
                className="w-1/2 py-1 px-6 bg-primary-200/25 rounded-lg border border-primary-400/50 text-primary-400 outline-none flex flex-col
                gap-2"
              >
                <option value="All">All</option>
                {Array.from(new Set(education.map((post) => post.year)))
                  .filter(Boolean)
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <p className="w-1/2 md:w-full px-10 md:px-4">
            Explore our comprehensive educational resources that delve into
            pivotal historical events, influential figures, and transformative
            periods. Our educational page offers detailed insights and engaging
            content designed to enrich your understanding of history and its
            impact on the present and future.
          </p>
          <section className="flex flex-col gap-8">
            {filteredPosts.map((education, index) => (
              <EducationCard highlight={education} key={index} index={index} />
            ))}
          </section>
        </>
      )}
    </article>
  )
}

function EducationCard({
  highlight,
  index,
}: {
  highlight: EducationModel
  index: number
}) {
  const navigate = useNavigate()
  const { isLogged } = useAuthContext()

  function handleClick() {
    if (!isLogged) {
      return navigate('/login')
    }

    navigate(`/education/${highlight._id}`)
  }

  return (
    <div
      className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''} z-20 md:flex-col md:w-full md:p-4 md:gap-4`}
    >
      <img
        src={highlight.coverImage}
        alt={highlight.title}
        className="w-3/5 h-[30rem] object-cover md:w-full"
      />
      <div className="w-2/5 p-10 flex flex-col gap-4g md:w-full md:p-0">
        <p className="font-cinzelBold text-2xl md:text-xl text-primary-400">
          {highlight.title}
        </p>
        <p className="text-primary-300 mb-4">
          {highlight.description.slice(0, 300)}...
        </p>
        <SlButton text="Learn More" onClick={handleClick} />
      </div>
    </div>
  )
}
