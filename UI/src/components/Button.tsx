import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded transition-colors select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2'

  const sizes: Record<string, string> = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-sm px-5 py-2.5',
  }

  const variants: Record<string, string> = {
    primary: disabled
      ? 'bg-muted text-dim border border-rule cursor-not-allowed'
      : 'bg-teal text-white border border-teal hover:opacity-90 active:opacity-80',
    secondary: disabled
      ? 'bg-muted text-dim border border-rule cursor-not-allowed'
      : 'bg-surface text-ink border border-rule hover:bg-muted active:bg-muted/70',
    ghost: disabled
      ? 'text-dim cursor-not-allowed'
      : 'text-ink hover:bg-muted active:bg-muted/70',
    danger: disabled
      ? 'bg-muted text-dim border border-rule cursor-not-allowed'
      : 'bg-scarlet text-white border border-scarlet hover:opacity-90',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
