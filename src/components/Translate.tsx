import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: any
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,rw',
            autoDisplay: false,
          },
          'google_translate_element'
        )
      }

      const scriptExists = document.querySelector(
        'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )

      if (!scriptExists) {
        const addScript = document.createElement('script')
        addScript.setAttribute(
          'src',
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        )
        document.body.appendChild(addScript)
      } else {
        window.googleTranslateElementInit()
      }
    }
  }, [])

  return <div id="google_translate_element"></div>
}
