import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../client'
import { Project } from '../types'
import { useProjects } from '../utils/hooks'

const Skeleton = ({ className }: { className: string }) => {
  return (
    <div className={`flex flex-col space-y-2 animate-pulse ${className}`}>
      <div className="max-w-[328px] h-[246px] bg-gray-200 rounded-lg"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
      <div className="w-full h-4 bg-gray-200"></div>
    </div>
  )
}

const ProjectsGallery = () => {
  const { projects, isLoading }: { projects: Project[]; isLoading: boolean } =
    useProjects()

  if (isLoading)
    return (
      <div className="lg:-ml-10 lg:-mr-10 grid lg:grid-cols-2 gap-8 gap-y-16">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className={`${i % 2 === 0 ? 'lg:-mt-24' : ''}`} />
        ))}
      </div>
    )

  return (
    <div className="lg:-ml-10 lg:-mr-10 grid lg:grid-cols-2 gap-8 gap-y-16">
      {projects?.map((project, index) => (
        <div
          key={index}
          className={`${
            index % 2 === 0 ? 'lg:-mt-24' : ''
          } flex flex-col justify-center items-center`}
        >
          <Link
            href={`/projects/${project.slug}`}
            as={`/projects/${project.slug}`}
            passHref
          >
            <a
              className="block leading-none no-underline text-black font-sans not-italic hover:text-black hover:opacity-75 transition-opacity ease-in-out duration-200 dark:text-white dark:hover:text-teal-200"
              title={project.title}
            >
              <Image
                width={800}
                height={600}
                layout="responsive"
                src={urlFor(project.coverImage).url()}
                alt={project.title}
                // className="rounded-lg"
              />
              <div className="py-2">
                <h3 className="text-base inline">{project.title}</h3>{' '}
                <span className="text-sm text-gray-600 font-normal dark:text-gray-400">
                  &mdash; {project.description}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProjectsGallery
