import { PortableText } from '@portabletext/react'
import { Author } from '../types'
import { useAuthor } from '../utils/hooks'
import Spinner from './Spinner'

const Dialog = ({ closeDialog }: { closeDialog: () => void }) => {
  const {
    author,
    isLoading,
    error,
  }: { author: Author; isLoading: boolean; error: Error } = useAuthor()

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>
  return (
    <div
      className="absolute left-0 right-0 mt-[5px] animate-fade rounded-xl bg-teal-200/90 backdrop-blur-sm p-6 font-serif text-xl italic text-teal-900 opacity-100 lg:block lg:w-auto max-w-sm cursor-pointer"
      onClick={closeDialog}
    >
      {!isLoading && author?.availability ? (
        <PortableText value={author?.busyText} />
      ) : (
        <PortableText value={author?.notBusyText} />
      )}

      <div className="mt-5 flex justify-center font-sans text-sm not-italic">
        click here to dismiss
      </div>
      <div className="arrow"></div>
    </div>
  )
}

export default Dialog
