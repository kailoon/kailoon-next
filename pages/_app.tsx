import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { DefaultSeo } from 'next-seo'
import { sanity } from '../client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/analytic'
import Script from 'next/script'
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from 'react-cookie-consent'
const isProduction = process.env.NODE_ENV === 'production'

export default function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (query: string) => sanity.fetch(query)
  const router = useRouter()

  // for google analytics
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // for subsequent page visits
  useEffect(() => {
    if (checkConsented()) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }
  }, [])

  const handleAccept = () => {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
    Cookies.set('CookieConsent', 'true', {
      expires: 7,
    })
  }

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
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {getCookieConsentValue() !== 'true' && (
        <div className="w-full bg-teal-200 fixed top-0 md:bottom-0 md:top-auto left-0 z-50 text-sm">
          <CookieConsent
            buttonText="Accept"
            enableDeclineButton
            onAccept={handleAccept}
            declineButtonText="Decline"
            expires={7}
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              position: 'relative',
              backgroundColor: 'transparent',
              color: '#000',
            }}
            buttonStyle={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '5px',
              paddingInline: '17px',
              fontSize: '13px',
              paddingBlock: '6px',
              margin: '0 15px 0 0',
            }}
            declineButtonStyle={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              color: '#000',
              margin: '0 10px 0 15px',
              borderRadius: '5px',
              paddingInline: '17px',
              fontSize: '13px',
              paddingBlock: '6px',
            }}
            buttonWrapperClasses="pb-4 md:pb-0"
          >
            <div>
              We use cookies to improve your experience on our site. Eg: Google
              Analytics.
            </div>
          </CookieConsent>
        </div>
      )}
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

// function for checking whether visitor has consented before
function checkConsented() {
  let decodedCookie: string = decodeURIComponent(document.cookie) // decode cookie
  let cookieArray = decodedCookie.split(';')

  const decodedCokkies = cookieArray.find((cookie: string) => {
    return cookie.substring(0, 13) === 'CookieConsent'
  })

  if (!decodedCokkies) {
    return false
  }
  if (decodedCokkies.substring(14, 18) === 'true') {
    return true
  }
  return false
}
