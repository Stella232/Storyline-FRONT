import { useNavigate } from 'react-router'
import { all } from '../../constants/highlights'
import SlButton from '../utils/SlButton'
import { useAuthContext } from '../../redux/AuthContext'
import { useEffect, useState } from 'react'

export default function Highlights() {
  const [currentImage, setCurrentImage] = useState(0) // Track the index of the current image

  useEffect(() => {
    let count = 0
    const imgs = [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/5.jpg',
      '/images/6.jpg',
    ]

    const interval = setInterval(() => {
      setTimeout(() => {
        count = count === imgs.length - 1 ? 0 : count + 1
        setCurrentImage(count)
      }, 500) // Duration of sliding effect (in milliseconds)
    }, 3000) // Delay between slides

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return (
    <div
      id="highlights"
      className="bg-primary-100 flex flex-col justify-center w-full relative gap-8 pb-10"
    >
      <section
        className={`h-screen w-full bg-cover bg-no-repeat relative this-one`}
        style={{ backgroundImage: `url(/images/${currentImage + 1}.jpg)` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-400/70 z-0">
          <div className="flex flex-col justify-center items-center h-full z-10">
            <p className="font-cinzelBold text-5xl text-primary-100">
              Highlights
            </p>
          </div>
        </div>

        <img
          src="/tl.png"
          className="absolute top-20 left-20 w-20 object-contain"
          alt=""
        />
        <img
          src="/tr.png"
          className="absolute top-20 right-20 w-20 object-contain"
          alt=""
        />
        <img
          src="/bl.png"
          className="absolute bottom-20 left-20 w-20 object-contain"
          alt=""
        />
        <img
          src="/br.png"
          className="absolute bottom-20 right-20 w-20 object-contain"
          alt=""
        />
      </section>
      <section className="flex flex-col gap-6">
        {all.map((highlight, index) => {
          return (
            <HighlightCard key={index} highlight={highlight} index={index} />
          )
        })}
      </section>
      <div className="w-full h-full absolute top-0 left-0 flex justify-between z-0">
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
        <div className="w-1/5 h-full border-r-2 border-primary-400/10"></div>
      </div>
    </div>
  )
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: any
  index: number
}) {
  const navigate = useNavigate()
  const { isLogged } = useAuthContext()

  function handleClick() {
    if (!isLogged) {
      return navigate('/login')
    }

    navigate(`/education`)
  }

  return (
    <div
      className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''} z-20`}
    >
      <img
        src={highlight.image}
        alt={highlight.title}
        className="w-3/5 h-[30rem] object-cover"
      />
      <div className="w-2/5 p-10 flex flex-col gap-4">
        <p className="font-cinzelBold text-2xl text-primary-400">
          {highlight.title}
        </p>
        <p className="text-primary-300">{highlight.description}</p>
        <SlButton text="Learn More" onClick={handleClick} />
      </div>
    </div>
  )
}
