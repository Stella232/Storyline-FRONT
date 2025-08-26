import { useNavigate, useParams } from 'react-router'
import { useGetEducationById } from '../../hooks/useGetEducation'
import { LoadingSection } from '../../components/utils/LoadingSection'
import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { OpenAIKey, apiUrl } from '../../utils/api'
import toast from 'react-hot-toast'
import { AudioPlayer } from './ViewForum'
import axios from 'axios'
import { getAuthToken } from '../../utils/getAuthToken'
import SlButton from '../../components/utils/SlButton'

export default function ViewEducationExpert() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const { id } = useParams()
  const { education, loading } = useGetEducationById(id!)
  const navigate = useNavigate()
  const token = getAuthToken()

  async function deleteStory() {
    setIsDeleting(true)
    try {
      await axios.delete(`${apiUrl}/education/${education?._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Story deleted')
      navigate('/expert/manage-education')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  function handleEditStory() {
    navigate(`/expert/manage-education/edit/${education?._id}`)
  }

  useEffect(() => {
    if (!loading && !education) {
      navigate('/expert/manage-education')
    }
    if (education?.description) {
      generateAudio(education.description + 'Section 2.' + education.more)
      // setAudioUrl('testing')
    }
  }, [education, loading])

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

  if (loading) {
    return <LoadingSection />
  }
  return (
    <article className="flex justify-between py-12 gap-8 px-10 md:px-4">
      <section className="flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center">
          <p className="font-cinzelBold text-2xl">{education?.title}</p>
          <div className="flex gap-4">
            <SlButton
              text="Delete"
              onClick={deleteStory}
              variant="warn"
              loading={isDeleting}
            />
            <SlButton text="Edit" onClick={handleEditStory} />
          </div>
        </div>
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
    </article>
  )
}
