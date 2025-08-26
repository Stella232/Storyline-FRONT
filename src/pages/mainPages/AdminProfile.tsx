import dayjs from 'dayjs'
import { useAuthContext } from '../../redux/AuthContext'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Navigate, useNavigate } from 'react-router'
import SlButton from '../../components/utils/SlButton'

dayjs.extend(relativeTime)

export default function AdminProfilePage() {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <div className="p-8">
      <div className="flex flex-wrap">
        <section className="w-full">
          <div className="bg-[url(/hero.webp)] bg-cover bg-center h-1/3 grid place-content-center">
            <div className="relative h-32 w-40">
              <img
                src={user?.profilePicture}
                className="min-w-40 min-h-40 h-40 w-40 rounded-full object-cover absolute -bottom-20"
                alt=""
              />
            </div>
          </div>
          <div className="bg-primary-200 flex flex-col justify-center items-center pt-24 pb-10">
            <p className="font-semibold text-2xl">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-lg">{user?.email}</p>
          </div>
        </section>
        <section className="flex w-full gap-6 my-4 ">
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-col">
              <PersonalInfo
                names={user?.firstName + ' ' + user?.lastName}
                joined={dayjs().fromNow()}
                mobile={user?.phone}
                email={user?.email}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface PersonalInfoProps {
  names: string | undefined
  joined: string | undefined
  mobile: string | undefined
  email: string | undefined
}

function PersonalInfo({ names, joined, mobile, email }: PersonalInfoProps) {
  const navigate = useNavigate()

  return (
    <div className="flex-1 px-10 bg-primary-200 rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Full name:</span>
          <span className="text-gray-700">{names}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Joined:</span>
          <span className="text-gray-700">{joined}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Mobile:</span>
          <span className="text-gray-700">{mobile}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Email:</span>
          <span className="text-gray-700">{email}</span>
        </li>
      </ul>
      <div className="my-4 w-full flex flex-col">
        <SlButton
          text="Edit Profile"
          onClick={() => navigate('/admin/settings')}
        />
      </div>
    </div>
  )
}
