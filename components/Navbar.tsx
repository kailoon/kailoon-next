import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { urlFor } from '../client'
import { Page } from '../types'
import { usePages } from '../utils/hooks'
import Tooltip from './Tooltip'

const Navbar = () => {
  const {
    pages,
    isLoading,
    error,
  }: { pages: Page[]; isLoading: boolean; error: Error } = usePages()
  const router = useRouter()
  const currentPath = router.asPath.split('/')[1]

  if (error) return <p>{error.message}</p>
  if (isLoading) return <div className="grid place-items-center md:w-20"></div>

  return (
    <nav className="flex justify-around items-center bg-black fixed bottom-0 py-4 px-3 text-sm font-medium tracking tight text-gray-200 w-full md:bg-transparent md:flex-col md:relative md:space-y-4 dark:bg-teal-300 dark:text-teal-900 z-50">
      {pages?.map(({ iconImage, title, slug }) => (
        <div
          key={title}
          className={`rounded-xl p-2 flex leading-none w-auto items-center justify-center ${
            currentPath === slug.current ? 'md:bg-teal-100' : 'dark:md:invert'
          }`}
        >
          {iconImage && (
            <Link
              href={`/${slug.current === 'home' ? '' : slug.current}`}
              passHref
            >
              <Tooltip content={title}>
                <div className="hidden md:block">
                  <Image
                    alt={title}
                    width={24}
                    height={24}
                    layout="fixed"
                    src={urlFor(iconImage).width(24).url()}
                    className="hidden md:block"
                  />
                </div>
              </Tooltip>
            </Link>
          )}

          <Link href={`/${slug.current === 'home' ? '' : slug.current}`}>
            <a className="md:hidden">{title}</a>
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Navbar
