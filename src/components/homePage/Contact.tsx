import SlButton from '../utils/SlButton'
import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [ ,setMessages] = useState({
    names: '',
    email: '',
    message: '',
  })
  const [, setNameError] = useState(false)
  const [, setEmailError] = useState(false)
  const [, setMessageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useRef<HTMLFormElement>(null)

  async function onSendMessage(e: any) {
    setIsLoading(true)
    e.preventDefault()

    try {
      await emailjs.sendForm(
        'service_gj3321i',
        'template_zdsv9ma',
        form.current as any,
        '1x730xIf2k3syVddD'
      )

      toast.success('Message sent successfully!')
    } catch (error) {
      toast.error('Failed to send message. Please try again later.')
      console.error('Email sending error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // function checkerror() {
  //   if (!messages.names) {
  //     setNameError(true)
  //     return false
  //   }

  //   if (!messages.email) {
  //     setEmailError(true)
  //     return false
  //   }
  //   if (!messages.message) {
  //     setMessageError(true)
  //     return false
  //   }
  //   return true
  // }

  function cancelErrors() {
    setNameError(false)
    setEmailError(false)
    setMessageError(false)
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    cancelErrors()
    setMessages((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <article
      id="contact"
      className="h-[65vh] sm:h-fit sm:py-6 flex justify-between gap-20 bg-primary-400 padd py-1 sm:flex-col"
    >
      <section className="w-1/2 sm:w-full h-full flex flex-col justify-around items-center sm:order-2">
        <form
          className="w-4/5 h-4/5 sm:w-full gap-4 flex flex-col justify-around"
          ref={form}
        >
          <input
            className="bg-primary-300/50 border-b-2 border-primary-100 text-xl outline-none text-primary-100 py-2 placeholder:text-primary-100 px-4"
            type="text"
            name="names"
            onChange={handleFormChange}
            onFocus={cancelErrors}
            // onBlur={checkerror}
            placeholder="Your Names"
          />
          <input
            className="bg-primary-300/50 border-b-2 border-primary-100 text-xl outline-none text-primary-100 py-2 placeholder:text-primary-100 px-4"
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={handleFormChange}
            onFocus={cancelErrors}
            // onBlur={checkerror}
          />
          <input
            className="bg-primary-300/50 border-b-2 border-primary-100 text-xl outline-none text-primary-100 py-2 placeholder:text-primary-100 px-4"
            type="text"
            placeholder="Your Phone Number"
            name="phone"
            onChange={handleFormChange}
            onFocus={cancelErrors}
            // onBlur={checkerror}
          />
          <textarea
            className="bg-primary-300/50 border-b-2 border-primary-100 text-xl outline-none text-primary-100 py-2 placeholder:text-primary-100 px-4 h-32"
            placeholder="Share your thoughts"
            name="message"
            onChange={handleFormChange}
            onFocus={cancelErrors}
            // onBlur={checkerror}
          ></textarea>
          <SlButton
            text="Send"
            onClick={onSendMessage as any}
            variant="tertiary"
            loading={isLoading}
            isDarkLoading
          />
        </form>
      </section>
      <section className="w-1/2 h-full flex flex-col justify-center gap-12 relative text-primary-100 sm:w-full sm:order-1">
        <div className="font-bold font-cinzelBold text-8xl md:text-6xl sm:text-5xl flex flex-col justify-center">
          <p>Contact</p>
          <p className="flex items-end">
            <span className="flex-1 w-96 h-2 bg-primary-100"></span>Us
          </p>
        </div>
        <p className="text-lg w-4/5 sm:hidden">
          It is very important for us to keep in touch with you, so we are
          always ready to receive any question that interestss you. Shoot!
        </p>
        <img
          src="/cont.png"
          className="w-full h-full object-contain absolute top-0 left-0 opacity-20"
          alt=""
        />
      </section>
    </article>
  )
}
