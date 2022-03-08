import { Project } from '../types'
import {
  CalendarIcon,
  MagicWandIcon,
  LayersIcon,
  Link2Icon,
} from '@radix-ui/react-icons'

const ProjectMeta = ({ project }: { project: Project }) => {
  return (
    <div className="border-y border-gray-100 dark:border-gray-900 py-8 grid gap-8 -mt-8">
      <div className="text-gray-600 text-sm dark:text-gray-400 flex-1">
        <div className="flex items-center space-x-2">
          <CalendarIcon /> <p>Year of completion</p>
        </div>
        <strong className="text-base text-black dark:text-white ml-6">
          {project.year}
        </strong>
      </div>
      <div className="text-gray-600 text-sm dark:text-gray-400 flex-1">
        <div className="flex items-center space-x-2">
          <MagicWandIcon /> <p>Services</p>
        </div>
        <strong className="text-base text-black dark:text-white ml-6">
          {project.services.length === 1 && <>{project.services[0].title}</>}
          {project.services.length === 2 && (
            <>{project.services.map(({ title }) => title).join(' & ')}</>
          )}
          {project.services.length > 2 && (
            <>
              {project.services
                .slice(0, project.services.length - 1)
                .map(({ title }) => title)
                .join(', ')}{' '}
              &amp; {project.services[project.services.length - 1].title}
            </>
          )}
        </strong>
      </div>
      <div className="text-gray-600 text-sm dark:text-gray-400 flex-1">
        <div className="flex items-center space-x-2">
          <LayersIcon /> <p> Technologies / Stacks / Tools</p>
        </div>

        <strong className="text-base text-black dark:text-white ml-6">
          {project.technologies}
        </strong>
      </div>
      {project.demoUrl && (
        <div className="text-gray-600 text-sm dark:text-gray-400 flex-1">
          <div className="flex items-center space-x-2">
            <Link2Icon /> <p> Live Site</p>
          </div>
          <strong className="text-base text-black dark:text-white ml-6">
            <a className="underline" href={project.demoUrl}>
              Check out the live product
            </a>
          </strong>
        </div>
      )}
    </div>
  )
}

export default ProjectMeta
