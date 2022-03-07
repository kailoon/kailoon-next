import { PortableText } from '@portabletext/react'
import { urlFor } from '../client'
import PortableComponent from './PortableComponent'
import Image from 'next/image'
import { Project } from '../types'

const Testimonial = ({ project }: { project: Project }) => {
  return (
    <section className="grid gap-4 md:flex md:space-x-2 md:justify-center md:items-center lg:-ml-8 lg:-mr-8 xl:-ml-16 xl:-mr-16 py-8">
      <div className="min-w-max mx-auto text-center md:text-right">
        <div className="w-14 h-14 rounded-full overflow-hidden mx-auto md:mr-0">
          {project.client.avatar && (
            <Image
              src={urlFor(project.client.avatar).url()}
              alt={project.client.name}
              layout="responsive"
              loading="lazy"
              width={100}
              height={100}
              className="overflow-hidden object-cover backdrop-blur"
            />
          )}
        </div>
        <div className="mt-2">
          <p className="font-medium">
            {project.client.name}
            <span className="text-sm text-gray-600 block dark:text-gray-400">
              {project.client.designation}
            </span>
          </p>
        </div>
      </div>
      {project.client.testimonial && (
        <div className="text-center md:text-left font-serif italic text-xl p-6 rounded-xl bg-teal-50 font-semibold text-teal-800 dark:bg-black dark:text-teal-200 relative dark:border dark:border-gray-800">
          <div className="testi-arrow"></div>
          <PortableText
            value={project.client.testimonial}
            components={PortableComponent}
          />
        </div>
      )}
    </section>
  )
}

export default Testimonial
