import type { Screen } from '../types'
import { mainManuscript } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function CitationDetailScreen({ onNavigate }: Props) {
  const citation = mainManuscript.citations.find((c) => c.id === 'cit-002')!
  const allFlagged = mainManuscript.citations.filter(
    (c) => c.status === 'flagged' || c.status === 'retracted'
  )
  const idx = allFlagged.findIndex((c) => c.id === citation.id)

  return (
    <div className="min-h-screen bg-canvas">
      {/* Breadcrumb */}
      <header
        className="bg-surface px-8 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <div className="flex items-center gap-3 text-sm">
          <button
            className="text-teal hover:underline cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            &larr; Dashboard
          </button>
          <span className="text-rule" aria-hidden="true">
            &middot;
          </span>
          <span className="text-dim">Citation {citation.index}</span>
          <span className="text-rule" aria-hidden="true">
            &middot;
          </span>
          <span className="text-dim">
            Issue {idx + 1} of {allFlagged.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">&larr; Previous</Button>
          <Button variant="secondary" size="sm">Next &rarr;</Button>
        </div>
      </header>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '32px' }}>
        {/* Citation metadata */}
        <div
          className="bg-surface rounded-lg p-6 mb-6"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-dim rounded"
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    border: '1px solid var(--color-rule)',
                  }}
                >
                  Ref. {citation.index}
                </span>
                <StatusBadge status={citation.status} />
              </div>
              <h1
                className="font-serif font-bold text-ink leading-snug mb-2"
                style={{ fontSize: 20 }}
              >
                {citation.title}
              </h1>
              <p className="text-sm text-dim">{citation.authors}</p>
              <div
                className="flex items-center gap-3 mt-3 font-mono text-dim flex-wrap"
                style={{ fontSize: 12 }}
              >
                <span>{citation.journal}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{citation.year}</span>
                {citation.doi && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <a
                      href={`https://doi.org/${citation.doi}`}
                      className="text-teal hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DOI: {citation.doi}
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Semantic score ring */}
            {citation.semanticScore !== undefined && (
              <div className="flex-shrink-0 text-center">
                <div
                  className="bg-amber-pale rounded-lg p-5"
                  style={{ border: '1px solid rgba(138,92,10,0.2)', minWidth: 100 }}
                >
                  <p
                    className="font-serif font-bold text-amber leading-none"
                    style={{ fontSize: 36 }}
                  >
                    {citation.semanticScore}%
                  </p>
                  <p
                    className="text-amber/70 font-mono uppercase tracking-wide mt-1"
                    style={{ fontSize: 10 }}
                  >
                    Semantic match
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Claim vs. abstract */}
        <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Claimed */}
          <div
            className="bg-amber-pale rounded-lg p-6"
            style={{ border: '1px solid rgba(138,92,10,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full bg-amber flex-shrink-0"
                aria-hidden="true"
              />
              <h2
                className="font-semibold text-amber uppercase tracking-widest"
                style={{ fontSize: 11 }}
              >
                Claimed in manuscript
              </h2>
            </div>
            <blockquote
              className="font-serif text-ink-2 leading-relaxed italic"
              style={{
                fontSize: 15,
                borderLeft: '2px solid var(--color-amber)',
                paddingLeft: 16,
              }}
            >
              &ldquo;{citation.claimedText}&rdquo;
            </blockquote>
          </div>

          {/* Abstract */}
          <div
            className="bg-surface rounded-lg p-6"
            style={{ border: '1px solid var(--color-rule)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full bg-teal flex-shrink-0"
                aria-hidden="true"
              />
              <h2
                className="font-semibold text-teal uppercase tracking-widest"
                style={{ fontSize: 11 }}
              >
                Source abstract (verified)
              </h2>
            </div>
            <p className="text-ink-2 leading-relaxed" style={{ fontSize: 15 }}>
              {citation.abstractText}
            </p>
          </div>
        </div>

        {/* AI analysis */}
        <div
          className="bg-surface rounded-lg p-6 mb-5"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full bg-dim flex-shrink-0"
              aria-hidden="true"
            />
            <h2
              className="font-semibold text-dim uppercase tracking-widest"
              style={{ fontSize: 11 }}
            >
              Semantic integrity analysis
            </h2>
            <span
              className="ml-auto font-mono text-dim rounded"
              style={{
                fontSize: 10,
                padding: '2px 8px',
                border: '1px solid var(--color-rule)',
              }}
            >
              AI &middot; local model
            </span>
          </div>
          <p className="text-ink text-sm leading-relaxed">{citation.semanticAnalysis}</p>

          {/* Match bar */}
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1">
              <div
                className="flex justify-between font-mono text-dim mb-1.5"
                style={{ fontSize: 11 }}
              >
                <span>Semantic similarity to source</span>
                <span className="text-amber">{citation.semanticScore}% match</span>
              </div>
              <div className="bg-muted rounded-full" style={{ height: 6 }}>
                <div
                  className="bg-amber rounded-full"
                  style={{ height: 6, width: `${citation.semanticScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended action */}
        <div
          className="bg-amber-pale/50 rounded-lg p-5 flex items-start gap-4"
          style={{ border: '1px solid rgba(138,92,10,0.18)' }}
        >
          <span className="text-amber text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
            ⚑
          </span>
          <div className="flex-1">
            <p className="font-semibold text-ink text-sm mb-1.5">Recommended action</p>
            <p className="text-sm text-dim leading-relaxed">
              Revise this sentence to accurately reflect the reported efficiency range (41&ndash;73%)
              and note that results were achieved under optimized conditions only.
              Unqualified claims of &ldquo;near-perfect&rdquo; performance are not supported by this source.
            </p>
            <div className="flex gap-3 mt-4">
              <Button size="sm">Mark as resolved</Button>
              <Button variant="secondary" size="sm">Dismiss flag</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
