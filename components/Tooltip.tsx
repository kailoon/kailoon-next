import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import React from 'react'

interface Props extends TooltipPrimitive.TooltipProps {
  onClick?: () => void
  href?: string
  content: string
}

const Tooltip = React.forwardRef(
  (
    {
      onClick,
      href,
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      ...props
    }: Props,
    ref: any
  ) => {
    return (
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={150}
      >
        <TooltipPrimitive.Trigger>
          <a
            href={href}
            onClick={onClick}
            ref={ref}
            className="md:hover:underline"
          >
            {children}
          </a>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          {...props}
          side="right"
          sideOffset={4}
          className="rounded-full bg-black py-2 px-4 text-xs font-medium text-white shadow-sm dark:bg-white dark:text-black"
        >
          {content}

          <TooltipPrimitive.Arrow
            width={12}
            height={5}
            className="-mt-[2px] fill-black dark:fill-white"
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    )
  }
)

export default Tooltip
