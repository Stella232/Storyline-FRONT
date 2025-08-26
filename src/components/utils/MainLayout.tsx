import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuthContext } from '../../redux/AuthContext'
import { NavLink } from 'react-router-dom'
import SlButton from './SlButton'
import CustomNavLink from '../../pages/admin/NavButton'

export default function MainLayout() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = (e: any) => {
    e.stopPropagation()
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <article onClick={() => setIsMenuOpen(false)}>
      <article className="border border-primary-400 bg-primary-400 padd flex justify-end items-end py-2">
        <section className="flex gap-8 sm:gap-4 items-center">
          <section className="flex items-center gap-2 text-primary-100 relative cursor-pointer group">
            <div>
              <p className="font-cinzelBold flex flex-col justify-end items-end text-end">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="font-sans text-sm">{user?.email}</p>
            </div>
            <img
              onClick={() => navigate('/profile')}
              src={user?.profilePicture}
              className="w-10 h-10 rounded-full object-cover"
            />
          </section>
          <button className="hidden sm:block" onClick={toggleMenu}>
            <img src="/icons/menw.png" className="w-8" alt="Menu" />
          </button>
        </section>
      </article>
      <article className="flex justify-end peer">
        <section className="w-[6%] hover:w-1/5 transition-all duration-200 peer group sm:hidden h-screen bg-primary-400 p-8 flex flex-col justify-between border-r-2 border-primary-300 fixed top-0 left-0">
          <p
            className="font-bold font-cinzelBold text-3xl text-primary-100 cursor-pointer group-hover:block hidden"
            onClick={() => navigate('/admin/manage-users')}
          >
            StoryLine
          </p>
          <img
            src="/logo.png"
            className="w-10 h-10 object-contain group-hover:hidden block"
            alt=""
          />
          <section className="flex flex-col gap-3">
            <CustomNavLink to="/home" text="Home" icon="hom" />
            <CustomNavLink to="/new-story" text="Share Your Story" icon="new" />
            <CustomNavLink to="/feeds" text="Stories" icon="commun" />
            <CustomNavLink to="/education" text="Education" icon="network" />
            <CustomNavLink to="/geo-location" text="Geo Location" icon="mapp" />
            <CustomNavLink to="/profile" text="Profile" icon="pro" />
            <CustomNavLink to="/contact" text="Contact" icon="email" />
          </section>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="bg-primary-100 hover:bg-primary-100/95 w-fit group-hover:w-full text-primary-400  py-2 group-hover:px-6 px-2 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium"
          >
            <img
              src="/icons/out.png"
              className="w-7 h-7 object-contain"
              alt=""
            />
            <p className="group-hover:block hidden">Logout</p>
          </button>
        </section>
        <section className="peer-hover:w-4/5 sm:w-full w-[94%] transition-all duration-200 ">
          <Outlet />
        </section>
      </article>
      <div
        className={`fixed top-0 px-4 right-0 sm:w-2/3 md:w-1/2 w-1/3  h-full bg-primary-300 text-primary-100 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between py-6 zed`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <img src="/icons/close.png" className="w-8" alt="Close" />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-12">
          <NavLinks to="/feeds" text="Feeds" />
          <NavLinks to="/education" text="Education" />
          <NavLinks to="/geo-location" text="Geo-Location" />
          <NavLinks to="/contact" text="Contact" />
        </nav>
        <section className="w-full flex flex-col gap-4 ">
          <SlButton
            text="Create Story"
            onClick={() => navigate('/new-story')}
            variant="tertiary"
          />
          <SlButton
            text="Logout"
            onClick={() => {
              logout()
              window.location.reload()
            }}
            variant="tertiary"
          />
        </section>
      </div>
    </article>
  )
}

function NavLinks({ to, text }: { to: string; text: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? 'font-cinzelBold text-lg' : ''} font-cinzel`
      }
    >
      {text}
    </NavLink>
  )
}
