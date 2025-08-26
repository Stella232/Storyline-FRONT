import { useNavigate } from 'react-router'
import SlButton from '../utils/SlButton'

export default function AboutSection() {
  const navigate = useNavigate()

  return (
    <article
      id="about"
      className="bg-primary-100 text-primary-400 padd py-20 flex justify-between gap-12 items-center"
    >
      <img
        src="/images/story.png"
        alt=""
        className="w-1/2 object-contain h-[26rem] object-center rounded-xl sm:hidden"
      />
      <section className="w-1/2 flex flex-col gap-8 sm:w-full">
        <div className="flex flex-col px-6 font-cinzelBold text-3xl">
          <p>""Discover, Share, and</p>
          <p className="self-end">Inspire Through Stories""</p>
        </div>
        <p className="font-bold text-2xl text-primary-200">
          Discover Storyline
        </p>
        <img
          src="/images/story.png"
          alt=""
          className="w-full object-contain h-[26rem] object-center rounded-xl hidden sm:block"
        />
        <p className="text-justify">
          Storyline is more than just a platform; it's a dynamic space where
          cultural education meets community engagement. Our platform offers a
          unique blend of features that allow users to explore, learn, and
          connect in ways that were previously unimaginable. Whether you're an
          individual eager to broaden your cultural horizons or a community
          leader looking to enhance engagement, Storyline has something for you.
        </p>
        <SlButton text="Start Reading" onClick={() => navigate('/login')} />
      </section>
    </article>
  )
}
