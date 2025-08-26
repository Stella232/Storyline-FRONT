interface CustomButtonProps {
  onClick: () => void
  text: string
  variant?: 'primary' | 'secondary'
  font?: 'bold' | 'normal'
  icon?: string
}
export default function CustomButton({
  onClick,
  text,
  variant = 'primary',
  font = 'bold',
  icon,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === 'primary'
          ? 'bg-primary-green hover:bg-primary-green/95 text-primary-blue'
          : 'border border-primary-green text-primary-green hover:bg-primary-green/10'
      } ${
        font === 'bold' ? 'font-bold' : 'font-normal'
      } py-2 px-6 rounded-3xl text-lg flex items-center justify-center gap-4 font-sansBlack`}
    >
      <p>{text}</p>
      {icon && <img src={icon} alt="icon" className="w-5 h-5 object-contain" />}
    </button>
  )
}
