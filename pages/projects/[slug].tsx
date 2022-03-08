import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { sanity, urlFor } from '../../client'
import Layout from '../../components/Layout'
import OtherProjects from '../../components/OtherProjects'
import PortableComponent from '../../components/PortableComponent'
import ProjectMeta from '../../components/ProjectMeta'
import Testimonial from '../../components/Testimonial'
import { Project } from '../../types'

const ProjectDetail = ({ project }: { project: Project }) => {
  return (
    <Layout
      h1={project.title}
      description={project.description}
      coverImage={urlFor(project.coverImage).url()}
    >
      <NextSeo
        title={project.seoTitle}
        description={project.seoDescription}
        canonical="https://kailoon.com/"
        openGraph={{
          url: 'https://kailoon.com/',
          title: project.seoTitle,
          description: project.seoDescription,
          images: [
            {
              url:
                project.seoImage && urlFor(project.seoImage).width(1200).url(),
              width: 800,
              height: 600,
              alt: project.seoTitle,
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
      {/* project meta */}
      <ProjectMeta project={project} />

      {/* testimonial */}
      {project.client && <Testimonial project={project} />}

      <article>
        {project.body && (
          <PortableText value={project.body} components={PortableComponent} />
        )}
      </article>
      <OtherProjects id={project._id} />
    </Layout>
  )
}

export default ProjectDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "project"]{slug}`
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

  const project = await sanity.fetch(
    groq`
    *[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      description,
      seoTitle,
      seoDescription,
      seoImage,
      coverImage,
      body,
      demoUrl,
      year,
      services[] -> {
        _id,
        title
      },
      technologies,
      client -> {
        name,
        designation,
        avatar,
        testimonial
      }
    }
  `,
    {
      slug,
    }
  )

  return {
    props: {
      project,
    },
    revalidate: 60,
  }
}
