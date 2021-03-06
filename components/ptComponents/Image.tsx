import { urlFor } from '../../client'
import { ImageProps } from '../../types'
import Image from 'next/image'
import { toBase64, shimmer } from '../Simmer'

export const getImageFigure = ({ value }: { value: ImageProps }) => {
  return (
    <div className="my-8 mx-0 md:-mx-4 xl:-mx-16">
      <figure>
        <Image
          src={urlFor(value).url()}
          alt={value.alt && value.alt}
          width={1200}
          height={800}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
        {value.caption && (
          <figcaption className="text-xs text-center text-gray-600 dark:text-gray-400">
            {value.caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
