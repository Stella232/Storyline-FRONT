import { LoadingSpinner } from './LoadingSection'

interface CustomButtonProps {
  onClick: () => void
  text: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'warn'
  icon?: string
  loading?: boolean
  isDarkLoading?: boolean
}
export default function SlButton({
  onClick,
  text,
  variant = 'primary',
  icon,
  loading,
  isDarkLoading,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === 'primary'
          ? 'bg-primary-400 hover:bg-primary-400/95 text-primary-100'
          : variant === 'tertiary'
            ? 'bg-primary-100 hover:bg-primary-100/95 text-primary-400'
            : variant === 'quaternary'
              ? 'bg-primary-400 hover:bg-primary-400/95 text-primary-100 border border-primary-100'
              : variant === 'warn'
                ? 'bg-red-700 hover:bg-red-800 text-primary-100'
                : 'border border-primary-400 text-primary-400 hover:bg-primary-400/10'
      }  py-2 px-6 rounded-lg text-lg flex items-center justify-center gap-4 font-cinzelMedium`}
    >
      {loading ? (
        <LoadingSpinner isDarkLoading={isDarkLoading} />
      ) : (
        <>
          <p>{text}</p>
          {icon && (
            <img src={icon} alt="icon" className="w-5 h-5 object-contain" />
          )}
        </>
      )}
    </button>
  )
}
