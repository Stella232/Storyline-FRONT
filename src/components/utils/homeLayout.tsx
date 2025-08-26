import { Outlet, useNavigate } from 'react-router'
import SlButton from './SlButton'
import SlNavLink from './slNavLink'

export default function HomeLayout() {
  const navigate = useNavigate()
  return (
    <header>
      <article className="border border-primary-400 padd flex justify-between items-end py-6">
        <p className="font-bold font-cinzelBold text-3xl">StoryLine</p>
        <section className="flex gap-4">
          <SlNavLink to="/" text="Home" />
          <SlNavLink to="/about" text="About" />
          <SlNavLink to="/highlights" text="Highlights" />
          <SlNavLink to="/faq" text="FAQ's" />
          <SlNavLink to="/contact" text="Contact" />
        </section>
        <SlButton text="Get Started" onClick={() => navigate('/signup')} />
      </article>
      <Outlet />
    </header>
  )
}
