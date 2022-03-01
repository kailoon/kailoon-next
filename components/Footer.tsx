const Footer = () => {
  return (
    <footer className="pb-20 lg:pb-0 text-sm text-gray-600 dark:text-gray-400">
      {new Date().getFullYear()}
      &copy;kailoon. Made with{' '}
      <a
        href="https://nextjs.org"
        title="nextjs"
        target="_blank"
        rel="noreferrer"
      >
        NextJS
      </a>
      ,{' '}
      <a
        href="https://tailwindcss.com"
        title="tailwindcss"
        target="_blank"
        rel="noreferrer"
      >
        tailwindcss
      </a>{' '}
      &amp; hosted on{' '}
      <a
        href="https://vercel.com"
        title="vercel"
        target="_blank"
        rel="noreferrer"
      >
        Vercel
      </a>
    </footer>
  )
}

export default Footer
