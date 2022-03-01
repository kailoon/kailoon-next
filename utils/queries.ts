import groq from 'groq'

export const getPages = groq`
    *[_type == "page"]{
      _id,
      title,
      slug,
      body,
      iconImage,
      heroTextOne,
      heroTextTwo,
    }
  `

export const getAuthorDetails = groq`
  *[_type == "author" && name == 'kailoon'][0]{
    _id,
    name,
    bio,
    image,
    socials[] -> {
      _id,
      platform,
      url,
      content
    },
    availability,
    notBusyText,
    busyText,
    stacks[] -> {
      _id,
      title,
    }

  }
`

export const getLatestTwoProjects = groq`
  *[_type == "project"] | order(publishedAt desc)[0..1]{
    _id,
    title,
    "slug": slug.current,
    services[] -> {
      _id,
      title
    }
  }
`

export const getProjects = groq`
  *[_type == "project"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    services[] -> {
      _id,
      title
    },
    year,
    demoUrl,
    publishedAt,
    body,
    dribbbleUrl,
    technologies,
    seoTitle,
    seoDescription,
    seoImage,
seoKeywords
  }
`

export const getPosts = groq`
  *[_type == "post"] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    categories[] -> {
      _id,
      title
    },
  }
`
