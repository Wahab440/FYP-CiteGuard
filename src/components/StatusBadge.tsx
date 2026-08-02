import type { CitationStatus } from '../data/mockData'

interface Props {
  status: CitationStatus
  size?: 'sm' | 'md'
}

const statusConfig: Record<
  CitationStatus,
  {
    label: string
    symbol: string
    textClass: string
    backgroundClass: string
    borderStyle: string
  }
> = {
  verified: {
    label: 'Verified',
    symbol: '✓',
    textClass: 'text-teal',
    backgroundClass: 'bg-teal-pale',
    borderStyle: 'border-teal/20',
  },
  'open-access': {
    label: 'Open Access',
    symbol: 'OA',
    textClass: 'text-cobalt',
    backgroundClass: 'bg-cobalt-pale',
    borderStyle: 'border-cobalt/20',
  },
  flagged: {
    label: 'Flagged',
    symbol: '⚑',
    textClass: 'text-amber',
    backgroundClass: 'bg-amber-pale',
    borderStyle: 'border-amber/20',
  },
  retracted: {
    label: 'Retracted',
    symbol: '✕',
    textClass: 'text-scarlet',
    backgroundClass: 'bg-scarlet-pale',
    borderStyle: 'border-scarlet/20',
  },
  'not-found': {
    label: 'Not Found',
    symbol: '?',
    textClass: 'text-slate',
    backgroundClass: 'bg-slate-pale',
    borderStyle: 'border-slate/20',
  },
  pending: {
    label: 'Pending',
    symbol: '◎',
    textClass: 'text-dim',
    backgroundClass: 'bg-muted',
    borderStyle: 'border-rule',
  },
}

export default function StatusBadge({ status, size = 'md' }: Props) {
  const config = statusConfig[status]
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-wider ${config.textClass} ${config.backgroundClass} ${sizeClass}`}
      style={{ borderColor: 'currentColor' }}
      aria-label={`Status: ${config.label}`}
      title={config.label}
    >
      <span aria-hidden="true">{config.symbol}</span>
      <span>{config.label}</span>
    </span>
  )
}