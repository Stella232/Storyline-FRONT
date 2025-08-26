export default function HeroSection() {
  return (
    <article className="flex justify-between sm:flex-col items-center padd relative text-primary-100 bg-primary-400 py-6">
      <section className="w-1/2 flex flex-col gap-6 z-10 sm:w-full">
        <p className="font-cinzel text-4xl md:text-3xl sm:text-xl whitespace-nowrap">
          Discover the Rich Tapestry <br />
          of Cultures and{' '}
          <span className="text-3xl font-cinzelBold">Communities</span>
        </p>
        <p>
          Discover how our innovative solutions can transform your cultural
          experience, enhance community engagement, and promote meaningful
          connections.
        </p>
      </section>
      <section className="w-1/2 relative z-10 sm:w-full">
        <img
          src="/images/mutara.jpg"
          alt=""
          className="w-full object-contain z-30 sm:w-full"
        />
      </section>
    </article>
  )
}
