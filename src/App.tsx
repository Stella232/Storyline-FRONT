import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import MainLayout from './components/utils/MainLayout'
import Feeds from './pages/mainPages/Feeds'
import Education from './pages/mainPages/Education'
import ViewEducation from './pages/mainPages/ViewEducation'
import ViewForum from './pages/mainPages/ViewForum'
import GeoLocation from './pages/mainPages/GeoLocation'
import Profile from './pages/mainPages/Profile'
import Settings from './pages/mainPages/Settings'
import Contact from './pages/mainPages/Contact'
import AddEducation from './pages/forms/AddEducation'
import AdminLayout from './pages/admin/AdminLayot'
import AdminEducation from './pages/admin/EducationPage'
import AddForum from './pages/admin/AddForum'
import AdminPortal from './pages/admin/AdminPortal'
import adminLoader, { expertLoader } from './loaders/adminLoader'
import homeLoader from './loaders/homeLoader'
import authLoader from './loaders/authLoader'
import AddStory from './pages/mainPages/AddStory'
import Users from './pages/admin/Users'
import EditStory from './pages/mainPages/EditStory'
import AdminForumPage from './pages/admin/Forum'
import AuthHomePage from './pages/AuthHomePage'
import AdminProfilePage from './pages/mainPages/AdminProfile'
import AdminSettingsPage from './pages/mainPages/AdminSettings'
import Language from './components/Language'
import AdminViewUser from './pages/admin/AdminViewUser'
import DashBoard from './pages/admin/Dashboard'
import ChangePasswordPage from './pages/ResetPage'
import EditEducation from './pages/forms/editEducaiton'
import ViewEducationExpert from './pages/mainPages/ViewEducationExpert'

export default function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} loader={homeLoader} />
        <Route path="login" element={<LoginPage />} loader={homeLoader} />
        <Route
          path="change-password"
          element={<ChangePasswordPage />}
          loader={homeLoader}
        />
        <Route
          path="admin-portal"
          element={<AdminPortal />}
          loader={homeLoader}
        />
        <Route path="signup" element={<SignupPage />} loader={homeLoader} />
        <Route element={<MainLayout />} loader={authLoader}>
          <Route path="home" element={<AuthHomePage />} />
          <Route path="feeds" element={<Feeds />} />
          <Route path="feeds/:id" element={<ViewForum />} />
          <Route path="feeds/:id/edit" element={<EditStory />} />
          <Route path="education" element={<Education />} />
          <Route path="education/:id" element={<ViewEducation />} />
          <Route path="geo-location" element={<GeoLocation />} />
          <Route path="new-story" element={<AddStory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="admin" element={<AdminLayout />} loader={adminLoader}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<Users />} />
          <Route path="manage-users/:id" element={<AdminViewUser />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          {/* <Route path="manage-education" element={<AdminEducation />} />
          <Route path="manage-education/add" element={<AddEducation />} />
          <Route path="manage-forum" element={<AdminForumPage />} />
          <Route path="manage-forum/add" element={<AddForum />} /> */}
        </Route>
        <Route path="expert" element={<AdminLayout />} loader={expertLoader}>
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="manage-education" element={<AdminEducation />} />
          <Route path="manage-education/:id" element={<ViewEducationExpert />} />
          <Route path="manage-education/add" element={<AddEducation />} />
          <Route path="manage-education/edit/:id" element={<EditEducation />} />
          <Route path="manage-forum" element={<AdminForumPage />} />
          <Route path="manage-forum/add" element={<AddForum />} />
        </Route>
      </Route>
    )
  )
  return (
    <article>
      <RouterProvider router={route} />
      <Language />
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  )
}
