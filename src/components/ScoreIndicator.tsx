interface Props {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export default function ScoreIndicator({ score, size = 'lg' }: Props) {
  const dims = { sm: 64, md: 96, lg: 128 }
  const strokeWidths = { sm: 5, md: 7, lg: 8 }
  const fontSizes = { sm: 14, md: 20, lg: 28 }
  const labelSizes = { sm: 9, md: 11, lg: 12 }

  const dim = dims[size]
  const sw = strokeWidths[size]
  const r = dim / 2 - sw / 2 - 2
  const cx = dim / 2
  const cy = dim / 2
  const circumference = 2 * Math.PI * r
  const dashOffset = circumference * (1 - score / 100)

  const color =
    score >= 80
      ? 'var(--color-teal)'
      : score >= 60
      ? 'var(--color-amber)'
      : 'var(--color-scarlet)'

  const trackColor =
    score >= 80
      ? 'var(--color-teal-pale)'
      : score >= 60
      ? 'var(--color-amber-pale)'
      : 'var(--color-scarlet-pale)'

  return (
    <div
      className="relative inline-flex items-center justify-center flex-shrink-0"
      style={{ width: dim, height: dim }}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Integrity score: ${score} out of 100`}
    >
      <svg
        width={dim}
        height={dim}
        style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={sw} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      <div className="flex flex-col items-center relative z-10">
        <span
          className="font-serif font-bold leading-none"
          style={{ fontSize: fontSizes[size], color }}
        >
          {score}
        </span>
        <span
          className="text-dim font-mono uppercase tracking-wider"
          style={{ fontSize: labelSizes[size], marginTop: 2 }}
        >
          /100
        </span>
      </div>
    </div>
  )
}
