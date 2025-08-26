import { useState, useEffect, useRef } from 'react'
import { EducationModel } from '../models/education.model'
import { useNavigate } from 'react-router'

export default function Carousel({
  slidesDatas,
}: {
  slidesDatas: EducationModel[]
}) {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slides = useRef<HTMLLIElement[]>([])
  const slideCount = slidesDatas.length
  const slideTiming = 3000
  const navigate = useNavigate()

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? slideCount : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slideCount ? 1 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentSlide(index + 1)
  }

  useEffect(() => {
    const id = setInterval(handleNext, slideTiming)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="main">
      <div className="relative w-full h-[35rem] md:h-96 sm:h-60">
        <button
          type="button"
          className="carousel_btn jsPrev"
          aria-label="Previous slide"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </button>

        <div className="overflow-hidden w-full h-full">
          <ul className="relative w-full h-full list-none m-0 p-0">
            {/* Duplicate slides for infinite loop effect */}
            {slidesDatas
              .concat(slidesDatas)
              .concat(slidesDatas)
              .map((slide, index) => (
                <li
                  key={index}
                  className={`carousel_slide ${currentSlide === index + 1 ? 'is-selected' : ''}`}
                  ref={(el) => (slides.current[index] = el!)}
                  onClick={() => navigate('/education/' + slide._id)}
                >
                  <div className="carousel_image">
                    <img
                      src={slide.coverImage}
                      alt=""
                      role="presentation"
                      className="h-96"
                    />
                  </div>
                  <div className="h-2/3 w-full bg-gradient-to-t from-primary-400 to-transparent absolute bottom-0 left-0 text-primary-100 flex flex-col justify-end items-start px-20 pb-14">
                    <h2 className="font-cinzelBold text-2xl">{slide.title}</h2>
                    <p className="text-left">
                      {slide.description.slice(0, 200)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <button
          type="button"
          className="carousel_btn jsNext"
          aria-label="Next slide"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </button>

        <div className="carousel_nav">
          {slidesDatas.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel_dot ${currentSlide === index + 1 ? 'is-selected' : ''}`}
              aria-label={`Slide number ${index + 1}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
