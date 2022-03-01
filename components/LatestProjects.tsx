import { ArrowSmRightIcon, BriefcaseIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import type { Project } from '../types'
import { useLatestProjects } from '../utils/hooks'
import Spinner from './Spinner'

const LatestProjects = () => {
  const {
    projects,
    isLoading,
    error,
  }: { projects: Project[]; isLoading: boolean; error: Error } =
    useLatestProjects()

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>

  return (
    <div className="rounded-xl border border-gray-200 py-5 px-6 dark:border-gray-800">
      <h4 className="mb-1 flex items-center space-x-2 text-xs uppercase text-gray-600 dark:text-gray-400">
        <BriefcaseIcon className="h-4 w-4" />
        <span>Latest Projects</span>
      </h4>
      {!isLoading &&
        projects &&
        projects.map(({ title, _id, slug, services }) => (
          <Link href={`/projects/${slug}`} key={_id} passHref>
            <a
              title={`read more about ${title}`}
              className="flex cursor-pointer items-center justify-between space-x-2 border-b py-4 text-sm last-of-type:border-0 hover:opacity-75 dark:border-gray-800"
            >
              <div>
                <h5 className="font-medium">{title}</h5>
                <p className="text-xs text-gray-600 dark:text-teal-300">
                  {services.length === 1 && <>{services[0].title}</>}
                  {services.length === 2 && (
                    <>{services.map(({ title }) => title).join(' & ')}</>
                  )}
                  {services.length > 2 && (
                    <>
                      {services
                        .slice(0, services.length - 1)
                        .map(({ title }) => title)
                        .join(', ')}{' '}
                      &amp; {services[services.length - 1].title}
                    </>
                  )}
                </p>
              </div>
              <ArrowSmRightIcon className="ml-auto h-4 w-4 text-gray-500" />
            </a>
          </Link>
        ))}
    </div>
  )
}

export default LatestProjects
