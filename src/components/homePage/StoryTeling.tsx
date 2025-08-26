import Frame from '../Frame'

export default function StoryTelingSection() {
  return (
    <article className="text-primary-100 padd py-20 flex flex-col gap-4 zed relative h-[90vh] sm:hfi">
      <section className="text-8xl md:text-6xl sm:text-5xl font-bold flex flex-col items-center justify-center gap-12 flex-1 sm:gap-4 z-30">
        <p>Every Story is a</p>
        <p className="w-full">
          New{' '}
          <span className="bg-primary-100 text-primary-400 px-4">
            Adventure
          </span>
        </p>
        <p className="">
          Start Sharing{' '}
          <span className="font-cinzelBold text-primary-200">Today</span>
        </p>
      </section>

      <video
        src="https://res.cloudinary.com/dnq1hgigs/video/upload/v1724023243/s86lpcnkhnza4ubwycqg.mp4"
        muted
        loop
        autoPlay
        className="absolute top-0 left-0 right-0 w-full h-full object-cover z-0"
      />
      <Frame size={20} />
      <div className="absolute w-full h-full top-0 left-0 right-0 bg-primary-400/80" />
    </article>
  )
}
