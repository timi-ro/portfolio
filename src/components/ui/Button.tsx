import { cn } from '@/lib/utils';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href: string;
}

export function Button({
  variant = 'primary',
  children,
  href,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-block font-medium text-sm tracking-wider transition-colors';

  const variants = {
    primary: 'px-12 py-4 bg-cyan-500 text-[#0A0A0F] hover:bg-cyan-400',
    secondary: 'px-10 py-4 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
  };

  return (
    <a
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
}