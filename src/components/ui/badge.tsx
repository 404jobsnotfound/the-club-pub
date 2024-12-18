/* eslint-disable max-len */
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const badgeVariants = (variant: BadgeVariant = 'default') => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variants: Record<BadgeVariant, string> = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  };

  return `${baseStyles} ${variants[variant]}`;
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line react/require-default-props
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const classNames = badgeVariants(variant) + (className ? ` ${className}` : '');
  return <div className={classNames} {...props} />;
}

export { Badge, badgeVariants };
