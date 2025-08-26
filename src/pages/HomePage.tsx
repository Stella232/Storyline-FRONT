import { useState } from 'react'
import { useNavigate } from 'react-router'
import AboutSection from '../components/homePage/AboutSection'
import Contact from '../components/homePage/Contact'
import Highlights from '../components/homePage/Highlights'
import HeroSection from '../components/homePage/heroSection'
import SlButton from '../components/utils/SlButton'
import SlNavLink from '../components/utils/slNavLink'
import StoryTelingSection from '../components/homePage/StoryTeling'
import Partners from '../components/Partners'
import FaqAccordion from '../components/Faq'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <article className="bg-primary-400 relative">
      <section className="relative">
        <header className="zed">
          <article className="border border-primary-400 padd flex justify-between items-end py-6 zed">
            <p className="font-bold font-cinzelBold text-3xl text-primary-100 zed">
              StoryLine
            </p>
            <section className="flex gap-4 sm:hidden md:text-sm zed">
              <ALink to="#" text="Home" />
              <ALink to="#about" text="About" />
              <ALink to="#highlights" text="Highlights" />
              <ALink to="#faq" text="FAQ's" />
              <ALink to="#contact" text="Contact" />
            </section>
            <div className="sm:hidden zed">
              <SlButton
                text="Login"
                onClick={() => navigate('/login')}
                variant="tertiary"
              />
            </div>
            <button className="sm:block hidden" onClick={toggleMenu}>
              <img src="/icons/menw.png" className="w-8" alt="Menu" />
            </button>
          </article>
        </header>
        <div className="zed">
          <StoryTelingSection />
        </div>
      </section>
      <AboutSection />
      <HeroSection />
      <Highlights />
      <div className="bg-primary-200 py-4">
        <p className="font-cinzelBold text-3xl my-6 px-10 text-center">
          Partners
        </p>
        <Partners />
      </div>
      <div className="w-full bg-primary-100 flex px-10 justify-around items-center">
        <img src="/fa.png" className="w-1/3 md:hidden" alt="" />
        <FaqAccordion />
      </div>
      <Contact />

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-primary-300 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:block hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <img src="/icons/close.png" className="w-8" alt="Close" />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-12">
          <SlNavLink to="/" text="Home" />
          <SlNavLink to="/about" text="About" />
          <SlNavLink to="/highlights" text="Highlights" />
          <SlNavLink to="/faq" text="FAQ's" />
          <SlNavLink to="/contact" text="Contact" />
        </nav>
        <div className="flex justify-center mt-12">
          <SlButton
            text="Login"
            onClick={() => navigate('/login')}
            variant="tertiary"
          />
        </div>
      </div>
    </article>
  )
}

function ALink({ to, text }: { to: string; text: string }) {
  return (
    <a
      href={to}
      className="text-primary-100 hover:text-primary-200"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}
