import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import "./styles/toggle.css"

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={`toggle toggle-${variant} toggle-${size} ${className || ''}`}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
