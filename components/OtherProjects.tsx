import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { urlFor } from '../client'
import { Project } from '../types'
import { useProjects } from '../utils/hooks'

const OtherProjects = ({ id }: { id: number }) => {
  const { projects, isLoading }: { projects: Project[]; isLoading: Boolean } =
    useProjects()

  return (
    <div className="mt-10 pt-10 border-t dark:border-gray-900">
      <p className="font-medium pb-2 text-gray-600 text-xs uppercase dark:text-gray-400">
        Browse Projects
      </p>
      {projects && (
        <div className="flex overflow-x-scroll pb-10 space-x-3 scrollbar-thin">
          {projects
            .filter((project) => project._id !== id)
            .map((project) => (
              <Link key={project._id} href={`/projects/${project.slug}`}>
                <a className="leading-none block" key={project._id}>
                  <div className="inline-block w-36 h-auto">
                    <Image
                      src={urlFor(project.coverImage).url()}
                      alt={project.title}
                      width={400}
                      height={300}
                      layout="responsive"
                    />
                    <div className="text-sm font-medium">{project.title}</div>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default OtherProjects
