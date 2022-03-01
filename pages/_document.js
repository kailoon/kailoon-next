import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GTM_ID } from '../lib/analytic'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="antialiased selection:bg-teal-100 dark:bg-black dark:text-white dark:selection:text-teal-900 dark:selection:bg-yellow-100">
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
