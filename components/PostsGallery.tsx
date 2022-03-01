import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../client'
import { Post } from '../types'
import { usePosts } from '../utils/hooks'
import Spinner from './Spinner'

const PostsGallery = () => {
  const {
    posts,
    isLoading,
    error,
  }: { posts: Post[]; isLoading: boolean; error: Error } = usePosts()

  if (isLoading)
    return (
      <div className="grid place-items-center h-96">
        <Spinner />
      </div>
    )
  if (error) return <p>{error.message}</p>
  if (posts.length === 0)
    return (
      <div className="grid place-items-center h-96">
        <p>Coming soon</p>
      </div>
    )
  return (
    <div className="grid gap-8 animate-fade">
      {!isLoading &&
        posts.map((post) => (
          <Link href={`/writings/${post.slug.current}`} passHref key={post._id}>
            <a className="flex space-x-5 items-center cursor-pointer font-sans not-italic text-black no-underline pb-5 border-b last-of-type:border-0 dark:text-white dark:border-gray-800">
              {post.mainImage && (
                <div className="w-32 h-auto">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    layout="responsive"
                    width={800}
                    height={600}
                  />
                </div>
              )}
              <div>
                <div className="text-sm text-gray-600 font-normal dark:text-gray-400">
                  {new Date(post.publishedAt).toDateString()} in
                  <span className="">
                    {' '}
                    {post.categories.length === 1 && (
                      <>{post.categories[0].title}</>
                    )}
                    {post.categories.length === 2 && (
                      <>
                        {post.categories.map(({ title }) => title).join(' & ')}
                      </>
                    )}
                    {post.categories.length > 2 && (
                      <>
                        {post.categories
                          .slice(0, post.categories.length - 1)
                          .map(({ title }) => title)
                          .join(', ')}{' '}
                        &amp;{' '}
                        {post.categories[post.categories.length - 1].title}
                      </>
                    )}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{post.title}</h2>
              </div>
            </a>
          </Link>
        ))}
    </div>
  )
}

export default PostsGallery
