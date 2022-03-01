import Aside from './Aside'
import Header from './Header'
import Hero from './Hero'
import Navbar from './Navbar'
import Footer from './Footer'

import Logo from './Logo'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
  h1?: string
  h2?: string
  coverImage?: string
  description?: string
  postTitle?: string
}

const Layout = ({
  children,
  h1,
  h2,
  coverImage,
  description,
  postTitle,
}: Props) => {
  return (
    <div className="mx-auto flex max-h-fit max-w-7xl">
      <div className="flex md:w-20 md:sticky md:top-0 md:left-0 md:border-r md:h-screen md:flex-col md:justify-between dark:border-gray-800">
        <Link href="/">
          <a title="Welcome to my humble site">
            <Logo className="text-black transform scale-75 hidden md:block mx-auto h-96 dark:text-white" />
          </a>
        </Link>
        <Navbar />
        <div className="hidden md:flex justify-center items-end h-96 pb-8"></div>
      </div>
      <div className="mx-auto max-w-3xl">
        {coverImage && (
          <div className="w-full h-40 overflow-hidden">
            <Image
              src={coverImage}
              alt="Cover Image"
              layout="responsive"
              width={800}
              height={600}
              className="w-full object-cover rounded-none md:rounded-b-3xl"
            />
          </div>
        )}
        <Header />
        <main>
          <div className="post px-6 pt-[230px] pb-20 md:pt-10 lg:px-20">
            <Hero
              h1={h1}
              h2={h2}
              description={description}
              postTitle={postTitle}
            />
            {children}
          </div>
        </main>

        <div className="px-6 pb-20 lg:hidden">
          <Footer />
        </div>
      </div>
      <Aside />
    </div>
  )
}

export default Layout
