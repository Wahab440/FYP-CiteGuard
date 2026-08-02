import type { Screen } from '../types'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

function PatternCard({
  title,
  icon,
  heading,
  body,
  actionLabel,
  actionVariant = 'primary',
  tag,
}: {
  title: string
  icon: string
  heading: string
  body: string
  actionLabel?: string
  actionVariant?: 'primary' | 'secondary'
  tag?: string
}) {
  return (
    <div
      className="bg-surface rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--color-rule)' }}
    >
      {/* Card label */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <p
          className="font-mono font-semibold text-dim uppercase tracking-widest"
          style={{ fontSize: 10 }}
        >
          {title}
        </p>
        {tag && (
          <span
            className="font-mono text-dim rounded"
            style={{ fontSize: 10, padding: '2px 6px', border: '1px solid var(--color-rule)' }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Pattern */}
      <div className="px-6 py-10 flex flex-col items-center text-center">
        <div
          className="text-dim mb-5"
          style={{ fontSize: 38, opacity: 0.3 }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="font-serif font-semibold text-ink mb-2" style={{ fontSize: 16 }}>
          {heading}
        </h3>
        <p
          className="text-dim text-sm leading-relaxed mb-6"
          style={{ maxWidth: 260 }}
        >
          {body}
        </p>
        {actionLabel && (
          <Button variant={actionVariant} size="sm">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function EmptyStatesScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-canvas px-8 py-8">
      <header className="mb-8">
        <p
          className="font-semibold text-dim uppercase tracking-widest mb-1"
          style={{ fontSize: 10 }}
        >
          Design System
        </p>
        <h1 className="font-serif font-bold text-ink" style={{ fontSize: 28 }}>
          Empty &amp; Error States
        </h1>
        <p className="text-dim text-sm mt-2">
          Patterns for zero-data, error, and unreachable-service states.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PatternCard
          title="No manuscripts yet"
          icon="◻"
          heading="No manuscripts uploaded"
          body="Upload your first manuscript to start checking citation integrity before submission."
          actionLabel="Upload manuscript"
          actionVariant="primary"
        />

        <PatternCard
          title="Upload failed"
          icon="✕"
          heading="Upload failed"
          body="The file could not be processed. Check that it is a valid PDF or DOCX file under 50 MB."
          actionLabel="Try again"
          actionVariant="secondary"
          tag="error"
        />

        <PatternCard
          title="No citations found"
          icon="◎"
          heading="No citations detected"
          body="CiteGuard could not find any citations in this document. Check that your reference list is correctly formatted."
          actionLabel="Re-analyze"
          actionVariant="secondary"
        />

        <PatternCard
          title="API unreachable"
          icon="⊘"
          heading="Verification unavailable"
          body="CrossRef and Semantic Scholar could not be reached. Results may be incomplete. Try again in a few minutes."
          actionLabel="Retry"
          actionVariant="secondary"
          tag="error"
        />

        <PatternCard
          title="All clear"
          icon="✓"
          heading="All citations verified"
          body="Every citation in this manuscript was found and verified. No flags, no retractions detected."
        />

        <PatternCard
          title="No results for filter"
          icon="◈"
          heading="No flagged citations"
          body="No citations match the current filter. Try selecting a different status or clearing your search."
          actionLabel="Clear filter"
          actionVariant="secondary"
        />

        <PatternCard
          title="Batch — queue empty"
          icon="◻"
          heading="No manuscripts in queue"
          body="Add manuscripts to start a batch analysis. You can upload up to 20 manuscripts at once."
          actionLabel="Add manuscripts"
          actionVariant="primary"
        />

        <PatternCard
          title="Report unavailable"
          icon="⊟"
          heading="Report not yet generated"
          body="The integrity report is generated after analysis completes. Return here once processing has finished."
        />

        <PatternCard
          title="Session expired"
          icon="⊙"
          heading="Session expired"
          body="Your session has timed out for security. Sign in again to continue &mdash; your results are saved."
          actionLabel="Sign in again"
          actionVariant="primary"
          tag="auth"
        />
      </div>
    </div>
  )
}
