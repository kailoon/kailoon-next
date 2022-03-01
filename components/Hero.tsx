interface Props {
  h1?: string
  h2?: string
  description?: string
  postTitle?: string
}

const Hero = ({ h1, h2, description, postTitle }: Props) => {
  return (
    <div className="pt-8 pb-24">
      {h1 && (
        <h1 className="text-7xl font-black tracking-tight md:font-serif md:text-2xl md:font-medium md:italic md:tracking-tight md:text-gray-500 dark:md:text-gray-400">
          {h1}
        </h1>
      )}
      {postTitle && (
        <h1 className="text-5xl font-semibold tracking-tight md:font-medium">
          {postTitle}
        </h1>
      )}
      {h2 && (
        <h2 className="mt-4 text-2xl font-medium tracking-tight text-gray-600 md:mt-0 md:text-6xl md:font-black md:text-black dark:md:text-white">
          {h2}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-2xl font-medium tracking-tight text-gray-600 md:mt-0 md:text-black md:text-3xl dark:md:text-white">
          {description}
        </p>
      )}
    </div>
  )
}

export default Hero
