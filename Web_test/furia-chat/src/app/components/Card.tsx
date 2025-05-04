import * as React from "react"
import { cn } from "@/lib/util"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-neutral-800 bg-white text-black shadow-sm", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
