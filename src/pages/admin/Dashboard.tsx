import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js'
import { LoadingSection } from '../../components/utils/LoadingSection'
import useAllInfo from '../../hooks/useAllInfo'
import { colors } from '../../constants/colors'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
)

export default function DashBoard() {
  const { users, posts, educations, loading } = useAllInfo()

  if (loading) {
    return <LoadingSection />
  }

  // Chart data preparation
  const userGrowthData = {
    labels: users.map((user) => new Date(user.createdAt).toLocaleDateString()), // Example date format
    datasets: [
      {
        label: 'User Growth',
        data: users.map((_, i) => {
          return i > 4 && i < 10 ? 2 : i
        }), // Each user contributes 1
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  const contentByRegionData = {
    labels: [...new Set(educations.map((education) => education.district))],
    datasets: [
      {
        label: 'Educational Content by District',
        data: [
          ...new Set(educations.map((education) => education.district)),
        ].map(
          (district) =>
            educations.filter((education) => education.district === district)
              .length
        ),
        backgroundColor: colors,
      },
    ],
  }

  const postCommentsData = {
    labels: posts.map((post) => post.title),
    datasets: [
      {
        label: 'Comments per Post',
        data: posts.map((post) => post.comments.length),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  }

  return (
    <div>
      <h1 className="font-cinzelBold text-3xl mb-6">Metrics</h1>
      <section className="flex mb-8 md:flex-col gap-12">
        <div className="w-1/2 md:w-full h-[30rem] flex justify-center items-center flex-col bg-primary-200 p-10 rounded-2xl">
          <h2>Content by Region</h2>
          <Pie data={contentByRegionData} />
        </div>
        <div className="w-1/2 md:w-full h-[30rem] flex justify-center items-center flex-col rounded-2xl bg-primary-200 p-10">
          <h2>User Growth Over Time</h2>
          <Line data={userGrowthData} />
        </div>
      </section>
      <div className="w-1/2 md:w-full bg-primary-200 p-10 rounded-2xl">
        <h2>Comments Engagement</h2>
        <Bar data={postCommentsData} />
      </div>
    </div>
  )
}
