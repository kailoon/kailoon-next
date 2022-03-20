import Link from 'next/link'
import Image from 'next/image'
import Tooltip from './Tooltip'
import { Author } from '../types'
import Dialog from './Dialog'
import { useEffect, useState } from 'react'
import { useAuthor } from '../utils/hooks'

const UserCard = () => {
  const [open, setOpen] = useState(false)
  const {
    author,
    isLoading,
    error,
  }: { author: Author; isLoading: boolean; error: Error } = useAuthor()

  useEffect(() => {
    if (localStorage.getItem('user-card-action') !== 'close') {
      const timer = setTimeout(() => {
        localStorage.setItem('user-card-action', 'open')
        setOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // remove localstorage after close window
      window.onunload = () => {
        localStorage.removeItem('user-card-action')
      }
    }
  }, [])

  const closeDialog = () => {
    localStorage.setItem('user-card-action', 'close')
    setOpen(false)
  }

  if (isLoading) return <div className="grid place-items-center h-12"></div>
  if (error) return <p>{error.message}</p>

  return (
    <section className="relative lg:pt-8 w-full animate-fade">
      <div className="flex items-center space-x-4">
        <div className="h-14 w-14 rounded-full">
          <Link href="/">
            <a title="avatar logo">
              <Image
                priority={true}
                src="/static/images/avatar.jpeg"
                alt="Kailoon"
                width={100}
                height={100}
                layout="responsive"
                className="cursor-pointer rounded-full grayscale"
              />
            </a>
          </Link>
        </div>
        <div className="">
          <strong className="font-serif text-xl italic leading-none text-black dark:text-white">
            kailoon
          </strong>
          <div className="flex space-x-4 text-sm text-gray-600 dark:text-teal-300">
            {!isLoading &&
              author?.socials.map(({ platform, url, _id, content }) => (
                <div key={_id}>
                  <Link href={url} passHref>
                    <Tooltip content={content}>{platform}</Tooltip>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      {!isLoading && open && <Dialog closeDialog={closeDialog} />}
    </section>
  )
}

export default UserCard
