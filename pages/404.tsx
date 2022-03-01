import Link from 'next/link'
import Layout from '../components/Layout'
import Image from 'next/image'

const vectorImage = '/static/images/errorimage.png'

const Custom404 = () => {
  return (
    <Layout h1="404" h2="Something went wrong...">
      <Image
        src={vectorImage}
        alt="404 image notification"
        layout="responsive"
        width={800}
        height={600}
        objectFit="contain"
        className="dark:backdrop-invert"
      />

      <Link href="/">
        <a className="underline text-center block my-8 text-sm">
          Go back to homepage.
        </a>
      </Link>
    </Layout>
  )
}

export default Custom404
