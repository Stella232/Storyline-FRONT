import { useState } from 'react'
import GeoLocationSection from '../../components/GeoLocation'
import useGetEducation from '../../hooks/useGetEducation'
import useGetPosts from '../../hooks/useGetPosts'
import { PostCard } from './Feeds'
import { EducationModel } from '../../models/education.model'
import { useNavigate } from 'react-router'

export default function GeoLocation() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const { education } = useGetEducation()
  const { posts } = useGetPosts()

  const filteredEducation = education?.filter(
    (elt) => elt.district === selectedCountry
  )

  function handleSelectedCountry(country: string) {
    setSelectedCountry(country)
  }

  return (
    <article className="py-12 px-10 mx-auto md:px-4">
      <h1 className="font-cinzelBold text-3xl mb-6">Geo Location</h1>
      <p className="mb-5 w-1/2 sm:w-full">
        Explore educational content from around the world with our interactive
        map. Simply select a country, and instantly access curated educational
        materials from that region, displayed conveniently below the map. This
        feature offers a seamless way to discover and engage with localized
        content, making global learning more accessible and engaging.
      </p>
      <GeoLocationSection setSelectedCountry={handleSelectedCountry} />
      <section className="">
        <p className="font-semibold text-xl my-6">
          Education content for{' '}
          {selectedCountry ? selectedCountry : 'all countries'}
        </p>
        <section className="flex flex-col gap-4">
          {!selectedCountry
            ? education
                ?.slice(0, 4)
                .map((education) => <EduCard edu={education} />)
            : filteredEducation?.map((education) => (
                <EduCard edu={education} />
              ))}
        </section>
        <p className="font-bold text-4xl my-6">Stories</p>
        <section className="flex flex-col gap-4">
          {posts?.slice(0, 3).map((education) => <PostCard {...education} />)}
        </section>
      </section>
    </article>
  )
}

export function EduCard({ edu }: { edu: EducationModel }) {
  const navigate = useNavigate()
  return (
    <article
      className="pb-6 border-b-2 cursor-pointer"
      onClick={() => navigate(`/education/${edu._id}`)}
    >
      <section className="flex gap-4 items-center">
        <section
          className="flex flex-col gap-2 w-3/4
        "
        >
          <p className="font-cinzelBold text-2xl">{edu.title}</p>
          <p className="text-sm">{edu.description.slice(0, 200)}...</p>
          <section className="flex gap-4 font-bold text-xl">
            <p className="text-sm">{edu.country}</p>
          </section>
        </section>
        <img
          src={edu.coverImage}
          alt=""
          className="h-60 w-2/5 object-cover rounded-lg"
        />
      </section>
    </article>
  )
}
