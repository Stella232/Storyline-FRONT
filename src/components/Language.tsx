import GoogleTranslate from './Translate'

export default function Language() {
  return (
    <div className="fixed bottom-10 right-10 bg-red-400 zzzzz">
      <section className="relative peer">
        <img
          src="/icons/language.png"
          className="w-16  bg-primary-300 p-4 peer"
          alt="Translate"
        />
        <div className="bg-primary-200 absolute bottom-full right-0 w-60 px-8 py-4 translate-x-[150%] peer-hover:translate-x-0 hover:translate-x-0 transition-all duration-300">
          <GoogleTranslate />
        </div>
      </section>
    </div>
  )
}
