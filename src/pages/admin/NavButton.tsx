import { NavLink, useMatch } from 'react-router-dom'

type CustomNavLinkProps = {
  to: string
  text: string
  icon: string
  styles?: string
}

export default function CustomNavLink({
  to,
  text,
  icon,
  styles,
}: CustomNavLinkProps) {
  const isActive = useMatch(to)
  return (
    <NavLink
      to={to}
      className={() =>
        `${
          isActive ? 'bg-primary-100 text-primary-400' : 'text-primary-100'
        } flex gap-4 group-hover:px-6 px-2 py-2 rounded-xl ${styles} w-fit group-hover:w-full transition-all duration-300 hover:bg-primary-200/20`
      }
    >
      <img
        src={`/icons/${icon}${isActive ? '' : 'w'}.png`}
        className="w-7 object-contain"
      />
      <p className="group-hover:block hidden transition-all duration-300">
        {text}
      </p>
    </NavLink>
  )
}
