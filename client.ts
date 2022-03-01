import { createClient, createPreviewSubscriptionHook } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'production', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: process.env.NODE_ENV === 'production', // `false` if you want to ensure fresh data
  apiVersion: '2021-10-21', // specify the API version
}
if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.')
}
if (!config.dataset) {
  throw Error('The dataset name is not set. Check your environment variables.')
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source)

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up the client for fetching data in the getProps page functions
export const sanity = createClient(config)
// Set up a preview client with serverless authentication for drafts

export const previewClient = createClient({
  ...config,
  useCdn: false,
})

//
