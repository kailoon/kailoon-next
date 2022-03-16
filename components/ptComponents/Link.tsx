import { PortableTextMarkComponent } from '@portabletext/react'

interface LinkMark {
  _type: 'link'
  href: string
}

export const PortableLink: PortableTextMarkComponent<LinkMark> = ({
  value,
  children,
}) => {
  const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
  const rel = !value?.href.startsWith('/') ? 'noreferrer noopener' : undefined
  return (
    <a href={value?.href} target={target} rel={rel}>
      {children}
    </a>
  )
}
