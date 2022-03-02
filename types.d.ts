export interface Project {
  _id: number
  title: string
  slug: string
  services: Service[]
  client: Client
  description: string
  coverImage: string
  year: string
  demoUrl: string
  body: BlockContent
  dribbbleUrl: string
  technologies: string
  seoTitle: string
  seoDescription: string
  seoImage: string
  seoKeywords: string
  publishedAt: string
}

export interface Post {
  _id: number
  title: string
  slug: {
    current: string
  }
  mainImage: string
  publishedAt: string
  body: BlockContent
  categories: Category[]
  author: Author
  seoTitle: string
  seoDescription: string
  seoImage: string
  seoKeywords: string
}

export interface Category {
  _id: number
  title: string
  description: string
}

export interface Author {
  _id: number
  name: string
  slug: {
    current: string
  }
  image: string
  bio: string
  socials: Social[]
  availability: boolean
  notBusyText: BlockContent
  busyText: BlockContent
  stacks: Stack[]
}

export interface Stack {
  _id: number
  title: string
}

export interface Service {
  _id: number
  title: string
  description: string
}

export interface Social {
  _id: number
  platform: string
  url: string
  content: string
}

export interface Page {
  _id: number
  title: string
  slug: {
    current: string
  }
  heroTextOne: string
  heroTextTwo: string
  iconImage: string
  seoTitle: string
  seoDescription: string
  seoImage: string
  seoKeywords: string
  body: BlockContent
}

export interface Client {
  _id: number
  name: string
  designation: string
  avatar: string
  testimonial: blockContent
}

export interface ImageProps {
  alt: any
  value: string
  caption: string
}

declare global {
  interface Window {
    gtag: any
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_PROJECT_ID: string

      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
    }
  }
}
