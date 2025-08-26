import { useState } from 'react'
import {
  LoadingSection,
  LoadingSpinner,
} from '../../components/utils/LoadingSection'
import useGetUsers from '../../hooks/useGetUsers'
import { User } from '../../models/user.model'
import { getAuthToken } from '../../utils/getAuthToken'
import axios from 'axios'
import toast from 'react-hot-toast'
import { apiUrl } from '../../utils/api'
import { useNavigate } from 'react-router'

export default function Users() {
  const { users, loading } = useGetUsers()

  if (loading) return <LoadingSection />

  return (
    <article>
      <h1 className="font-cinzelBold text-3xl mb-6">External Users</h1>
      <section className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 text-left font-cinzelBold font-semibold text-gray-700 uppercase tracking-wider">
                FirstName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                LastName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((elt) => !elt.disabled)
              .filter((elt) => !elt.isAdmin && !elt.isExpert)
              .map((data, index) => (
                <TableRow key={index} user={data} />
              ))}
          </tbody>
        </table>
      </section>
      <h1 className="font-cinzelBold text-3xl my-6">Manage Experts</h1>
      <section className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 text-left font-cinzelBold font-semibold text-gray-700 uppercase tracking-wider">
                FirstName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                LastName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((elt) => !elt.disabled)
              .filter((elt) => elt.isExpert)
              .map((data, index) => (
                <TableRow key={index} user={data} />
              ))}
          </tbody>
        </table>
      </section>
      <h1 className="font-cinzelBold text-3xl my-6">Manage Admins</h1>
      <section className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 text-left font-cinzelBold font-semibold text-gray-700 uppercase tracking-wider">
                FirstName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                LastName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((elt) => !elt.disabled)
              .filter((elt) => elt.isAdmin)
              .map((data, index) => (
                <TableRow key={index} user={data} />
              ))}
          </tbody>
        </table>
      </section>
      <h1 className="font-cinzelBold text-3xl my-6">Flagged Users</h1>
      <section className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 text-left font-cinzelBold font-semibold text-gray-700 uppercase tracking-wider">
                FirstName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                LastName
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-5 py-3 sm:text-xs border-b-2 border-gray-200 bg-primary-200 font-cinzelBold text-left font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((elt) => elt.disabled)
              .map((data, index) => (
                <TableRow key={index} user={data} />
              ))}
          </tbody>
        </table>
      </section>
    </article>
  )
}

function TableRow({ user }: { user: User }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const token = getAuthToken()
  const navigate = useNavigate()

  async function deleteUser(e: any) {
    e.stopPropagation()
    setIsDeleting(true)
    try {
      await axios.delete(`${apiUrl}/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('User Status Updated')
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  function navigateToUser() {
    navigate(`/admin/manage-users/${user._id}`)
  }

  return (
    <tr onClick={navigateToUser}>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <img
          src={user.profilePicture}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.firstName}</p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.lastName}</p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.address || 'NONE'}
        </p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.occupation || 'NONE'}
        </p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date().toLocaleDateString()}
        </p>
      </td>
      <td className="px-5 py-5 sm:text-xs border-b border-gray-200 bg-primary-200 text-sm">
        <button
          className={`${user.disabled ? 'bg-primary-300 text-primary-100' : 'bg-red-500 text-primary-100'}  p-2 rounded w-full`}
          onClick={deleteUser}
        >
          {isDeleting ? (
            <LoadingSpinner />
          ) : user.disabled ? (
            'Enable'
          ) : (
            'Flag'
          )}
        </button>
      </td>
    </tr>
  )
}
