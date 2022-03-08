import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { sanity, urlFor } from '../../client'
import Layout from '../../components/Layout'
import PortableComponent from '../../components/PortableComponent'
import { shimmer, toBase64 } from '../../components/Simmer'
import { Post } from '../../types'

const PostDetail = ({ post }: { post: Post }) => {
  return (
    <Layout postTitle={post.title}>
      <NextSeo
        title={post.seoTitle}
        description={post.seoDescription}
        canonical="https://kailoon.com/"
        openGraph={{
          url: 'https://kailoon.com/',
          title: post.seoTitle,
          description: post.seoDescription,
          images: [
            {
              url: post.seoImage && urlFor(post.seoImage).width(1200).url(),
              width: 800,
              height: 600,
              alt: post.seoTitle,
              type: 'image/jpeg',
            },
          ],
          site_name: 'kailoon.com',
        }}
        twitter={{
          handle: '@kailoon', //twitter:creator
          site: '@kailoon', //twitter:site
          cardType: 'summary_large_image', //twitter:card
        }}
      />
      <article className="animate-fade">
        <div className="text-sm mb-2 text-gray-600 dark:text-gray-400">
          {new Date(post.publishedAt).toDateString()} in
          <span className="">
            {' '}
            {post.categories.length === 1 && <>{post.categories[0].title}</>}
            {post.categories.length === 2 && (
              <>{post.categories.map(({ title }) => title).join(' & ')}</>
            )}
            {post.categories.length > 2 && (
              <>
                {post.categories
                  .slice(0, post.categories.length - 1)
                  .map(({ title }) => title)
                  .join(', ')}{' '}
                &amp; {post.categories[post.categories.length - 1].title}
              </>
            )}
          </span>
        </div>
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            width={800}
            height={600}
            layout="responsive"
            loading="lazy"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
        )}

        {post.body && (
          <PortableText value={post.body} components={PortableComponent} />
        )}
      </article>
    </Layout>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "post"]{slug}`
  const pages = await sanity.fetch(query)
  const paths = pages.map((page: { slug: { current: string } }) => ({
    params: { slug: page.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug?: string }
  const post = await sanity.fetch(
    groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      seoTitle,
      seoDescription,
      seoImage,
      publishedAt,
      categories[]->{title},
      body,
      mainImage
    }
  `,
    {
      slug,
    }
  )

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
