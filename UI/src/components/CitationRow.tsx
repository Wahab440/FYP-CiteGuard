import { useState } from 'react'
import type { Citation } from '../data/mockData'
import StatusBadge from './StatusBadge'

interface Props {
  citation: Citation
  onViewDetail?: (id: string) => void
}

export default function CitationRow({ citation, onViewDetail }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`border-b border-rule last:border-0 transition-colors ${
        expanded ? 'bg-slate-pale/30' : 'hover:bg-muted/20'
      }`}
    >
      {/* Collapsed row */}
      <div
        className="flex items-center gap-4 px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={`detail-${citation.id}`}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <span className="font-mono text-xs text-dim w-6 text-right flex-shrink-0">
          {citation.index}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink truncate">{citation.title}</p>
          <p className="text-xs text-dim mt-0.5 truncate">
            {citation.authors} &middot; {citation.journal} &middot; {citation.year}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {citation.isOpenAccess && citation.status !== 'open-access' && (
            <span
              className="font-mono text-cobalt bg-cobalt-pale rounded text-xs font-medium"
              style={{
                padding: '2px 6px',
                border: '1px solid rgba(27,88,162,0.2)',
                fontSize: 11,
              }}
              aria-label="Open Access"
            >
              OA
            </span>
          )}
          <StatusBadge status={citation.status} />
        </div>

        {citation.doi ? (
          <a
            href={`https://doi.org/${citation.doi}`}
            className="text-xs text-dim font-mono hover:text-teal hidden lg:block truncate"
            style={{ width: 160 }}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {citation.doi}
          </a>
        ) : (
          <span className="text-xs text-dim font-mono hidden lg:block" style={{ width: 160 }}>
            &mdash;
          </span>
        )}

        <span
          className={`text-dim transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
          style={{ fontSize: 12 }}
          aria-hidden="true"
        >
          ▾
        </span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          id={`detail-${citation.id}`}
          className="px-4 pb-5"
          style={{ marginLeft: 40, borderLeft: '2px solid var(--color-rule)', paddingLeft: 20 }}
        >
          {citation.status === 'retracted' && citation.retractionNotice && (
            <div
              className="bg-scarlet-pale rounded p-4 mb-4"
              style={{ border: '1px solid rgba(184,45,24,0.2)' }}
            >
              <p className="text-xs font-semibold text-scarlet uppercase tracking-wider mb-1.5">
                ✕ Retraction Notice
              </p>
              <p className="text-sm text-scarlet/80 leading-relaxed">{citation.retractionNotice}</p>
            </div>
          )}

          {citation.status === 'not-found' && (
            <div
              className="bg-slate-pale rounded p-4 mb-4"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">
                ? Source not found
              </p>
              <p className="text-sm text-dim leading-relaxed">
                This citation could not be verified in CrossRef, OpenAlex, or Semantic Scholar.
                Check for typos in the author names, title, or DOI, and verify the reference manually.
              </p>
            </div>
          )}

          {citation.status === 'flagged' && citation.claimedText && (
            <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div
                className="bg-amber-pale rounded p-4"
                style={{ border: '1px solid rgba(138,92,10,0.2)' }}
              >
                <p className="text-xs font-semibold text-amber uppercase tracking-wider mb-2">
                  ⚑ Claimed in manuscript
                </p>
                <p className="text-sm text-ink-2 leading-relaxed italic">
                  &ldquo;{citation.claimedText}&rdquo;
                </p>
              </div>
              <div
                className="bg-surface rounded p-4"
                style={{ border: '1px solid var(--color-rule)' }}
              >
                <p className="text-xs font-semibold text-dim uppercase tracking-wider mb-2">
                  Source abstract (verified)
                </p>
                <p className="text-sm text-ink-2 leading-relaxed">{citation.abstractText}</p>
              </div>
            </div>
          )}

          {citation.semanticAnalysis && (
            <div
              className="bg-amber-pale/60 rounded p-4 mb-4"
              style={{ border: '1px solid rgba(138,92,10,0.15)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-amber uppercase tracking-wider">
                  AI Semantic Analysis
                </p>
                <span className="font-mono text-xs text-amber">
                  Match: {citation.semanticScore}%
                </span>
              </div>
              <p className="text-sm text-ink-2 leading-relaxed">{citation.semanticAnalysis}</p>
              <div className="mt-3 bg-amber-pale rounded-full" style={{ height: 3 }}>
                <div
                  className="bg-amber rounded-full"
                  style={{ height: 3, width: `${citation.semanticScore}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-1">
            {citation.doi && (
              <a
                href={`https://doi.org/${citation.doi}`}
                className="text-xs text-teal font-mono hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI: {citation.doi}
              </a>
            )}
            {onViewDetail && (
              <button
                className="text-xs text-teal hover:underline cursor-pointer"
                onClick={() => onViewDetail(citation.id)}
              >
                View full detail &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
