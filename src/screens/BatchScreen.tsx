import { useState } from 'react'
import type { Screen } from '../types'
import { batchManuscripts, type BatchManuscript } from '../data/mockData'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function BatchScreen({ onNavigate }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showUploadBanner, setShowUploadBanner] = useState(false)

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allSelected = batchManuscripts.length > 0 && batchManuscripts.every((m) => selected.has(m.id))
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(batchManuscripts.map((m) => m.id)))

  const scoreColor = (ms: BatchManuscript) => {
    if (!ms.integrityScore) return 'text-dim'
    return ms.integrityScore >= 80
      ? 'text-teal'
      : ms.integrityScore >= 60
      ? 'text-amber'
      : 'text-scarlet'
  }

  const statusLabel: Record<BatchManuscript['status'], string> = {
    complete: 'Complete',
    processing: '● Processing',
    queued: 'Queued',
    error: '✕ Error',
  }

  const statusColor: Record<BatchManuscript['status'], string> = {
    complete: 'text-teal',
    processing: 'text-cobalt',
    queued: 'text-slate',
    error: 'text-scarlet',
  }

  const complete = batchManuscripts.filter((m) => m.status === 'complete')
  const totalCitations = batchManuscripts.reduce((s, m) => s + (m.citationsTotal ?? 0), 0)
  const totalIssues = batchManuscripts.reduce(
    (s, m) => s + (m.flaggedCount ?? 0) + (m.retractedCount ?? 0),
    0
  )
  const avgScore =
    complete.length > 0
      ? Math.round(
          complete.reduce((s, m) => s + (m.integrityScore ?? 0), 0) / complete.length
        )
      : null

  return (
    <div className="min-h-screen bg-canvas">
      <header
        className="bg-surface px-8 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <div>
          <p
            className="font-semibold text-dim uppercase tracking-widest mb-1"
            style={{ fontSize: 10 }}
          >
            Researcher
          </p>
          <h1 className="font-serif font-bold text-ink" style={{ fontSize: 22 }}>
            Batch Manuscript Review
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <Button variant="secondary" size="sm">
              Export audit trail ({selected.size}) &darr;
            </Button>
          )}
          <Button size="sm" onClick={() => setShowUploadBanner((b) => !b)}>
            + Add manuscripts
          </Button>
        </div>
      </header>

      {showUploadBanner && (
        <div
          className="bg-teal-pale px-8 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(27,106,87,0.2)' }}
        >
          <p className="text-sm text-teal font-medium">
            Drag files here or click to browse &mdash; up to 20 manuscripts per batch
          </p>
          <button
            className="text-teal/60 hover:text-teal text-sm cursor-pointer"
            onClick={() => setShowUploadBanner(false)}
          >
            &times; Close
          </button>
        </div>
      )}

      <div className="px-8 py-6">
        {/* Aggregate stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Manuscripts',
              value: batchManuscripts.length,
              sub: `${complete.length} complete`,
              color: 'text-ink',
            },
            {
              label: 'Total citations',
              value: totalCitations,
              sub: 'across all manuscripts',
              color: 'text-ink',
            },
            {
              label: 'Total issues',
              value: totalIssues,
              sub: 'flags + retractions',
              color: totalIssues > 0 ? 'text-amber' : 'text-teal',
            },
            {
              label: 'Avg. integrity',
              value: avgScore !== null ? `${avgScore}/100` : '—',
              sub: 'completed analyses only',
              color: avgScore !== null && avgScore >= 80 ? 'text-teal' : avgScore !== null && avgScore >= 60 ? 'text-amber' : 'text-dim',
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-surface rounded-lg p-5"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              <p
                className="font-semibold text-dim uppercase tracking-wider mb-2"
                style={{ fontSize: 10 }}
              >
                {card.label}
              </p>
              <p
                className={`font-serif font-bold mb-1 ${card.color}`}
                style={{ fontSize: 28 }}
              >
                {card.value}
              </p>
              <p className="text-xs text-dim">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Manuscripts table */}
        <div
          className="bg-surface rounded-lg mb-6"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          {/* Table header bar */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--color-rule)' }}
          >
            <p className="font-medium text-ink text-sm">Manuscripts</p>
            <div
              className="flex items-center gap-3 font-mono text-dim"
              style={{ fontSize: 11 }}
            >
              <span>
                {batchManuscripts.filter((m) => m.status === 'processing').length} processing
              </span>
              <span>&middot;</span>
              <span>
                {batchManuscripts.filter((m) => m.status === 'queued').length} queued
              </span>
            </div>
          </div>

          {/* Column headers */}
          <div
            className="flex items-center gap-4 px-4 py-2.5 bg-muted/20"
            style={{ borderBottom: '1px solid var(--color-rule)' }}
          >
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="flex-shrink-0"
              style={{ accentColor: 'var(--color-teal)' }}
              aria-label="Select all manuscripts"
            />
            <span className="font-mono text-dim uppercase tracking-wider flex-1" style={{ fontSize: 10 }}>
              Manuscript
            </span>
            <span className="font-mono text-dim uppercase tracking-wider text-center flex-shrink-0" style={{ fontSize: 10, width: 110 }}>
              Status
            </span>
            <span className="font-mono text-dim uppercase tracking-wider text-center flex-shrink-0" style={{ fontSize: 10, width: 90 }}>
              Score
            </span>
            <span className="font-mono text-dim uppercase tracking-wider text-center flex-shrink-0" style={{ fontSize: 10, width: 80 }}>
              Citations
            </span>
            <span className="font-mono text-dim uppercase tracking-wider text-center flex-shrink-0" style={{ fontSize: 10, width: 70 }}>
              Issues
            </span>
            <span className="font-mono text-dim uppercase tracking-wider text-right flex-shrink-0" style={{ fontSize: 10, width: 72 }}>
              Uploaded
            </span>
            <span style={{ width: 64 }} />
          </div>

          {/* Rows */}
          {batchManuscripts.map((ms) => (
            <div
              key={ms.id}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-muted/20 transition-colors ${
                selected.has(ms.id) ? 'bg-teal-pale/10' : ''
              }`}
              style={{ borderBottom: '1px solid var(--color-rule)' }}
            >
              <input
                type="checkbox"
                checked={selected.has(ms.id)}
                onChange={() => toggleSelect(ms.id)}
                className="flex-shrink-0"
                style={{ accentColor: 'var(--color-teal)' }}
                aria-label={`Select ${ms.title}`}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{ms.title}</p>
                <p className="text-xs text-dim mt-0.5">
                  {ms.author} &middot; {ms.department}
                </p>
              </div>

              <div className="flex-shrink-0 text-center" style={{ width: 110 }}>
                <span className={`font-mono text-xs font-medium ${statusColor[ms.status]}`}>
                  {statusLabel[ms.status]}
                </span>
              </div>

              <div className="flex-shrink-0 text-center" style={{ width: 90 }}>
                {ms.integrityScore !== undefined ? (
                  <span className={`font-mono font-bold text-sm ${scoreColor(ms)}`}>
                    {ms.integrityScore}/100
                  </span>
                ) : (
                  <span className="font-mono text-dim" style={{ fontSize: 12 }}>
                    &mdash;
                  </span>
                )}
              </div>

              <div className="flex-shrink-0 text-center" style={{ width: 80 }}>
                <span className="font-mono text-sm text-dim">
                  {ms.citationsTotal ?? <span>&mdash;</span>}
                </span>
              </div>

              <div className="flex-shrink-0 text-center" style={{ width: 70 }}>
                {ms.flaggedCount !== undefined ? (
                  <span
                    className={`font-mono font-medium text-sm ${
                      (ms.flaggedCount + (ms.retractedCount ?? 0)) > 0 ? 'text-amber' : 'text-teal'
                    }`}
                  >
                    {ms.flaggedCount + (ms.retractedCount ?? 0)}
                  </span>
                ) : (
                  <span className="font-mono text-dim" style={{ fontSize: 12 }}>
                    &mdash;
                  </span>
                )}
              </div>

              <div className="flex-shrink-0 text-right" style={{ width: 72 }}>
                <span className="font-mono text-dim" style={{ fontSize: 11 }}>
                  {new Date(ms.uploadedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex-shrink-0 flex justify-end" style={{ width: 64 }}>
                {ms.status === 'complete' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('dashboard')}
                  >
                    View &rarr;
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Audit trail export */}
        <div
          className="bg-surface rounded-lg p-6"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="font-serif font-semibold text-ink mb-1.5" style={{ fontSize: 16 }}>
                Audit Trail Export
              </h3>
              <p className="text-sm text-dim leading-relaxed" style={{ maxWidth: 560 }}>
                Export a full audit trail for submission to a journal editorial board or
                institutional review committee. Includes all verification results, semantic
                analysis scores, and database query logs with timestamps.
              </p>
            </div>
            <Button variant="secondary" size="sm" className="flex-shrink-0">
              Export full audit trail &darr;
            </Button>
          </div>

          <div
            className="mt-4 flex gap-4 font-mono text-dim flex-wrap"
            style={{ fontSize: 11 }}
          >
            <span>Format: JSON &middot; CSV &middot; PDF</span>
            <span>&middot;</span>
            <span>Includes: query timestamps &middot; source versions &middot; model hash</span>
          </div>
        </div>
      </div>
    </div>
  )
}
