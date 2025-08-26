import { useState } from 'react'
import { useNavigate } from 'react-router'
import AboutSection from '../components/homePage/AboutSection'
import Contact from '../components/homePage/Contact'
import Highlights from '../components/homePage/Highlights'
import HeroSection from '../components/homePage/heroSection'
import SlButton from '../components/utils/SlButton'
import SlNavLink from '../components/utils/slNavLink'
import StoryTelingSection from '../components/homePage/StoryTeling'

export default function AuthHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    console.log('clicked')
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <article className="bg-primary-400">
      <StoryTelingSection />
      <AboutSection />
      <HeroSection />
      <Highlights />
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
