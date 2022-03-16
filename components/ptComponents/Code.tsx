import { PortableTextComponent } from '@portabletext/react'
import Refractor from 'react-refractor'
import typescript from 'refractor/lang/typescript'
import javascript from 'refractor/lang/javascript'
import scss from 'refractor/lang/scss'

// Prism auto-highlights, but we only want the API, so we need to set it to manual mode
if (typeof window !== 'undefined') {
  const prismWindow = window as any
  prismWindow.Prism = prismWindow.Prism || {}
  prismWindow.Prism.manual = true
}

Refractor.registerLanguage(typescript)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(scss)

export interface CodeBlock {
  _type: 'code'
  code: string
  language?: string
}

export const Code: PortableTextComponent<CodeBlock> = ({ value }) => {
  return <Refractor language={value.language || 'js'} value={value.code} />
}
