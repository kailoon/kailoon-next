import { useRouter } from 'next/router'
import { Author } from '../types'
import { useAuthor } from '../utils/hooks'
import Footer from './Footer'
import LatestProjects from './LatestProjects'
import Spinner from './Spinner'
import UserCard from './UserCard'

const Aside = () => {
  const router = useRouter()
  const {
    author,
    isLoading,
    error,
  }: { author: Author; isLoading: boolean; error: Error } = useAuthor()

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>

  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-col justify-between pt-10 pb-4 lg:flex pr-8">
      <div className="grid gap-4">
        <UserCard />
        <div className="border-t pt-2 dark:border-gray-800">
          <strong className="text-xs mb-2 block text-gray-600 font-normal uppercase dark:text-gray-400">
            Current Stack
          </strong>
          <div className="text-xs">
            {!isLoading &&
              author?.stacks.map(({ title, _id }) => (
                <span
                  key={_id}
                  className="py-1 px-2 rounded bg-cyan-100 text-cyan-900 font-medium inline-block whitespace-nowrap mr-1 mb-2 dark:bg-gray-900/50 dark:text-gray-400"
                >
                  {title}
                </span>
              ))}
          </div>
        </div>
      </div>
      {router.asPath !== '/projects' && <LatestProjects />}

      <Footer />
    </aside>
  )
}

export default Aside
