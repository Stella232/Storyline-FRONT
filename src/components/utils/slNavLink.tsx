import { NavLink } from 'react-router-dom'

interface CustomNavLinkProps {
  to: string
  text: string
  icon?: string
}

export default function SlNavLink({ to, text, icon }: CustomNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:text-primary-200  ${isActive ? 'text-primary-100 font-cinzelBold from-transparent' : ''} text-primary-100 transition-all duration-300 font-cinzelMedium`
      }
    >
      <p>{text}</p>
      {icon && <img src={icon} alt="icon" className="w-5 h-5 object-contain" />}
    </NavLink>
  )
}
