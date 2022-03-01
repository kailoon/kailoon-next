import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { DefaultSeo } from 'next-seo'
import { sanity } from '../client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { GTM_ID, pageview } from '../lib/analytic'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (query: string) => sanity.fetch(query)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
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
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
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
      />
      <Component {...pageProps} />
    </SWRConfig>
  )
}
