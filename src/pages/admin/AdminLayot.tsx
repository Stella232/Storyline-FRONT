import { Outlet, useNavigate } from 'react-router'
import CustomNavLink from './NavButton'
import SlButton from '../../components/utils/SlButton'
import { useAuthContext } from '../../redux/AuthContext'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminLayout() {
  const { user, logout } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = (e: any) => {
    e.stopPropagation()
    setIsMenuOpen((prev) => !prev)
  }
  const navigate = useNavigate()

  return (
    <article className="flex justify-end relative peer">
      <section className="w-[6%] hover:w-1/5 transition-all duration-300 sm:hidden h-screen peer group bg-primary-400 p-8 flex flex-col justify-between border-r-2 border-primary-300 fixed top-0 left-0">
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
          {user?.isAdmin && (
            <>
              <CustomNavLink to="/admin" text="Metrics" icon="dashboard" />
              <CustomNavLink
                to="/admin/manage-users"
                text="Manage Users"
                icon="use"
              />
            </>
          )}
          {user?.isExpert && (
            <>
              <CustomNavLink
                to={
                  user?.isAdmin
                    ? '/admin/manage-education'
                    : '/expert/manage-education'
                }
                text="Education Contents"
                icon="edu"
              />
              <CustomNavLink
                to={
                  user?.isAdmin ? '/admin/manage-forum' : '/expert/manage-forum'
                }
                text="Discussion Forum"
                icon="for"
              />
            </>
          )}
        </section>
        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className="bg-primary-100 hover:bg-primary-100/95 w-fit group-hover:w-full text-primary-400  py-2 group-hover:px-6 px-2 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium"
        >
          <img src="/icons/out.png" className="w-7 h-7 object-contain" alt="" />
          <p className="group-hover:block hidden">Logout</p>
        </button>
      </section>
      <section className="peer-hover:w-4/5 sm:w-full w-[94%] transition-all duration-300">
        <section className="bg-primary-400 py-4 flex justify-end px-12">
          <section className="flex items-center gap-2 text-primary-100">
            <img
              onClick={() => navigate('/admin/profile')}
              src={user?.profilePicture}
              className="w-12 h-12 rounded-full object-cover"
            />
            <button className="hidden sm:block" onClick={toggleMenu}>
              <img src="/icons/menw.png" className="w-8" alt="Menu" />
              {/* styles='group-hover:flex hidden'' */}
            </button>
          </section>
        </section>
        <section className="px-12 md:px-8 sm:px-4 py-12">
          <Outlet />
        </section>
      </section>
      <div
        className={`fixed top-0 px-4 right-0 sm:w-2/3 md:w-1/2 w-1/3  h-full bg-primary-300 text-primary-100 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between py-6 zed`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <img src="/icons/close.png" className="w-8" alt="Close" />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-12">
          <NavLinks to="/admin/manage-users" text="Manage Users" />
          <NavLinks to="/admin/manage-education" text="Manage Education" />
          <NavLinks to="/admin/manage-forum" text="Manage Stories" />
        </nav>
        <section className="w-full flex flex-col gap-4 ">
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
