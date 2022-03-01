const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M52 39a13.02 13.02 0 0 1-13-13 13.02 13.02 0 0 1 13-13v26zM26 13L13 26l13 13V13z"></path>
      <path d="M13 39L0 52V13L13 0V39Z"></path>
    </svg>
  )
}

export default Logo
