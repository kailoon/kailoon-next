import Layout from '../components/Layout'
import kwesforms from 'kwesforms'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'

const contact = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    kwesforms.init()
  }, [])

  return (
    <Layout h1="Keep in touch" h2="How can I help?">
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
        <form
          className="kwes-form"
          action="https://kwesforms.com/api/foreign/forms/bYVbqBq8FFH7X2H4JFEN"
        >
          <fieldset className="text-sm grid gap-4">
            <div>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                data-kw-rules="required|min:3|max:255"
              />
            </div>
            <div>
              <label htmlFor="email">Your email</label>
              <input type="email" name="email" data-kw-rules="required|email" />
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <select
                type="subject"
                name="subject"
                data-kw-select-type="required"
              >
                <option value="general">General</option>
                <option value="project">Project Request</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                data-kw-rules="required|min:10|max:1000"
                rows={10}
                placeholder="Please be as specific as possible. Eg: project details, examples, budget, etc."
              />
            </div>

            <div>
              <button
                type="submit"
                className="py-3 px-5 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </article>
    </Layout>
  )
}

export default contact
