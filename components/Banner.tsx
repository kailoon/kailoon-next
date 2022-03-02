import { SpeakerphoneIcon } from '@heroicons/react/outline'

const Banner = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) => {
  return (
    <div
      className={`w-full fixed top-0 left-0 bg-teal-200/75 backdrop-blur z-50 text-xs cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="max-w-5xl mx-auto p-3 text-black flex justify-between items-center">
        <div className="inline-flex items-center space-x-1">
          <SpeakerphoneIcon className="h-5 w-5 text-black" />
          <p>Welcome to my humble site. Feel free to browse around and test.</p>
        </div>
        <button className="p-1 px-3 bg-teal-300/40 rounded">close</button>
      </div>
    </div>
  )
}

export default Banner
