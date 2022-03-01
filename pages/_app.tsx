import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { DefaultSeo } from 'next-seo'
import { sanity } from '../client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/analytic'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (query: string) => sanity.fetch(query)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {/* Google Tag Manager - Global base code */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <DefaultSeo
        titleTemplate="kailoon — %s"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://kailoon.com/',
          site_name: 'kailoon.com',
        }}
        twitter={{
          handle: '@kailoon',
          site: '@kailoon',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            name: 'mask-icon',
            content: 'safari-pinned-tab',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/static/images/favicon.svg',
            type: 'image/svg+xml',
          },
          {
            rel: 'apple-touch-icon',
            href: '/static/images/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            rel: 'icon',
            href: '/static/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            rel: 'icon',
            href: '/static/images/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            rel: 'mask-icon',
            href: '/static/images/safari-pinned-tab.svg',
            color: '#5bbad5',
          },
          {
            rel: 'manifest',
            href: '/static/site.webmanifest',
          },
        ]}
      />
      <Component {...pageProps} />
    </SWRConfig>
  )
}
