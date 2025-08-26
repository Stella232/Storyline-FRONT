import { useNavigate, useParams } from 'react-router'
import useGetEducation, {
  useGetEducationById,
} from '../../hooks/useGetEducation'
import { LoadingSection } from '../../components/utils/LoadingSection'
import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { OpenAIKey } from '../../utils/api'
import toast from 'react-hot-toast'
import { AudioPlayer } from './ViewForum'

export default function ViewEducation() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const { id } = useParams()
  const { education, loading } = useGetEducationById(id!)
  const { education: all, loading: eduLoading } = useGetEducation()
  const navigate = useNavigate()

  useEffect(() => {
    if (education?.description) {
      generateAudio(education.description + 'Section 2.' + education.more)
      // setAudioUrl('testing')
    }
  }, [education])

  // Function to generate audio from post description using OpenAI
  async function generateAudio(description: string) {
    try {
      const openai = new OpenAI({
        apiKey: OpenAIKey,
        dangerouslyAllowBrowser: true,
      })

      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: description,
      })

      const buffer = await mp3.arrayBuffer()
      const audioBlob = new Blob([buffer], { type: 'audio/mp3' })
      const audioUrl = URL.createObjectURL(audioBlob) // Convert Blob to URL
      setAudioUrl(audioUrl) // Set the audio URL for the audio player
    } catch (error) {
      console.error('Failed to generate audio', error)
      toast.error('Failed to generate audio for post description!')
    }
  }

  if (loading || eduLoading) {
    return <LoadingSection />
  }
  return (
    <article className="flex justify-between py-12 gap-8 px-10 md:px-4">
      <section className="flex flex-col gap-6 w-3/4 pr-8 border-r-2 border-primary-200/50 sm:w-full sm:border-none sm:pr-0">
        <p className="font-cinzelBold text-2xl">{education?.title}</p>
        <div className="flex items-center gap-1 font-bold">
          <img
            src="/icons/location.png"
            className="w-5 h-5 object-contain"
            alt=""
          />
          <p>{education?.district}</p>
          <p> . </p>
          <p>{education?.country}</p>
        </div>
        <p>{education?.description}</p>
        <img
          src={education?.coverImage}
          alt="cover image"
          className="w-full h-80 object-cover object-center"
        />
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
        <p>{education?.more}</p>
        <iframe
          src={education?.youtubeLinks}
          title="Yampano - Hawayu (Official Video)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
          className="w-full h-80"
        ></iframe>
      </section>
      <aside className="w-1/4 h-52 pl-6 sm:hidden flex flex-col gap-6">
        <p className="font-cinzelBold text-2xl">Related Education</p>
        {all
          .filter((elt) => elt._id !== id)
          .slice(0, 3)
          .map((edu) => {
            return (
              <article onClick={() => navigate(`/education/${edu._id}`)}>
                <img
                  src={edu.coverImage}
                  alt=""
                  className="h-40 w-full object-cover object-center"
                />
                <p className="font-cinzelBold text-xl">{edu.title}</p>
                <p>{edu.description.slice(0, 100)} ....</p>
              </article>
            )
          })}
      </aside>
    </article>
  )
}
