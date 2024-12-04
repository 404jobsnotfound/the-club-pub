import * as React from 'react';

// Simple utility function for combining class names
function cn(...args: (string | undefined | false)[]): string {
  return args.filter(Boolean).join(' ');
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean; // Optional prop to render as a different element
}

const buttonVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determine the component type to render.
    const Comp = asChild ? 'span' : 'button'; // Render as button or span based on `asChild` prop.

    // Combine all the variant and size classes.
    const buttonClassNames = cn(
      // eslint-disable-next-line max-len
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      buttonVariants.variant[variant || 'default'], // Default to "default" if no variant is provided
      buttonVariants.size[size || 'default'], // Default to "default" if no size is provided
      className, // Additional custom classes passed via `className` prop
    );

    return (
      <Comp
        className={buttonClassNames}
        ref={ref}
        {...props}
      />
    );
  },
);

// Define default props for `variant`, `size`, and `asChild`
Button.defaultProps = {
  variant: 'default', // Default value for variant
  size: 'default', // Default value for size
  asChild: false, // Default value for asChild
};

Button.displayName = 'Button';

export { Button };
