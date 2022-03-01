import { NextSeo } from 'next-seo'
import Layout from '../../components/Layout'
import { sanity, urlFor } from '../../client'
import { PortableText } from '@portabletext/react'
import { Page } from '../../types'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps } from 'next'
import ProjectsGallery from '../../components/ProjectsGallery'
import PostsGallery from '../../components/PostsGallery'

const Page = ({ page }: { page: Page }) => {
  return (
    <Layout h1={page.heroTextOne} h2={page.heroTextTwo}>
      <NextSeo
        title={page.seoTitle}
        description={page.seoDescription}
        canonical="https://kailoon.com/"
        openGraph={{
          url: 'https://kailoon.com/',
          title: page.seoTitle,
          description: page.seoDescription,
          images: [
            {
              url: page.seoImage && urlFor(page.seoImage).width(1200).url(),
              width: 800,
              height: 600,
              alt: page.seoTitle,
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
      <article>
        <PortableText value={page.body} />
        {page.slug.current === 'projects' && <ProjectsGallery />}
        {page.slug.current === 'writings' && <PostsGallery />}
      </article>
    </Layout>
  )
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "page" && title != "Contact"]{slug}`
  const pages = await sanity.fetch(query)
  const paths = pages.map((page: { slug: { current: string } }) => ({
    params: { slug: page.slug.current },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug?: string }

  const page = await sanity.fetch(
    groq`
    *[_type == "page" && slug.current == $slug][0]
  `,
    {
      slug,
    }
  )

  return {
    props: {
      page,
    },
    revalidate: 60,
  }
}
