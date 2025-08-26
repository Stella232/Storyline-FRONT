import Loading from 'react-loading'

export function LoadingSection() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Loading type="spin" color="#12372A" width={50} height={50} />
    </div>
  )
}

export function LoadingSpinner({ isDarkLoading }: { isDarkLoading?: boolean }) {
  return (
    <Loading
      type="spin"
      color={isDarkLoading ? '#12372A' : '#FBFADA'}
      width={25}
      height={25}
    />
  )
}
