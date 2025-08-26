import FAQSection from '../../components/Faq'
import Contact from '../../components/homePage/Contact'

export default function ContactPage() {
  return (
    <article className="py-12 px-10">
      <h1 className="text-4xl font-cinzelBold mb-8">Reach Us</h1>
      <Contact />
      <div className="w-full bg-primary-100 flex px-10 justify-around items-center">
        <img src="/fa.png" className="w-1/3 md:hidden" alt="" />
        <FAQSection />
      </div>
    </article>
  )
}
