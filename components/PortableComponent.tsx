import { PortableTextComponents } from '@portabletext/react'
import { Code } from './ptComponents/Code'
import { getImageFigure } from './ptComponents/Image'
import { PortableLink } from './ptComponents/Link'

const PortableComponent: PortableTextComponents = {
  types: {
    code: Code,
    image: getImageFigure,
  },
  marks: {
    link: PortableLink,
  },
}

export default PortableComponent
