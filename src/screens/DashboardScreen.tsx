import { useState } from 'react'
import type { Screen } from '../types'
import { mainManuscript } from '../data/mockData'
import type { CitationStatus } from '../data/mockData'
import ScoreIndicator from '../components/ScoreIndicator'
import CitationRow from '../components/CitationRow'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

type Filter = 'all' | CitationStatus

export default function DashboardScreen({ onNavigate }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const ms = mainManuscript

  const filtered = ms.citations
    .filter((c) => {
      if (filter === 'all') return true
      if (filter === 'open-access') return c.isOpenAccess
      return c.status === filter
    })
    .filter((c) => {
      if (!search) return true
      const q = search.toLowerCase()
      return c.title.toLowerCase().includes(q) || c.authors.toLowerCase().includes(q)
    })

  const filters: Array<{ value: Filter; label: string; count: number }> = [
    { value: 'all', label: 'All', count: ms.citationsTotal },
    { value: 'flagged', label: 'Flagged', count: ms.citationsFlagged },
    { value: 'retracted', label: 'Retracted', count: ms.citationsRetracted },
    { value: 'not-found', label: 'Not Found', count: ms.citationsNotFound },
    { value: 'verified', label: 'Verified', count: ms.citationsVerified },
    { value: 'open-access', label: 'Open Access', count: ms.citations.filter((c) => c.isOpenAccess).length },
  ]

  const filterColor: Record<Filter, string> = {
    all: 'text-ink',
    flagged: 'text-amber',
    retracted: 'text-scarlet',
    'not-found': 'text-slate',
    verified: 'text-teal',
    'open-access': 'text-cobalt',
    pending: 'text-dim',
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page header */}
      <header
        className="bg-surface px-8 py-5 flex items-start justify-between gap-6"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <div className="min-w-0">
          <p
            className="font-semibold text-dim uppercase tracking-widest mb-1"
            style={{ fontSize: 10 }}
          >
            Results
          </p>
          <h1
            className="font-serif font-bold text-ink leading-snug"
            style={{ fontSize: 20, maxWidth: 600 }}
          >
            {ms.title}
          </h1>
          <p className="text-sm text-dim mt-1">
            {ms.author} &middot; {ms.institution} &middot;{' '}
            {new Date(ms.uploadedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('report')}>
            Preview report
          </Button>
          <Button size="sm">Download report &darr;</Button>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Score */}
          <div
            className="bg-surface rounded-lg p-5 flex items-center gap-5 col-span-2 lg:col-span-1"
            style={{ border: '1px solid var(--color-rule)' }}
          >
            <ScoreIndicator score={ms.integrityScore} size="md" />
            <div>
              <p
                className="font-semibold text-dim uppercase tracking-wider mb-1"
                style={{ fontSize: 10 }}
              >
                Integrity Score
              </p>
              <p className="text-sm text-dim leading-snug">
                {ms.integrityScore >= 80
                  ? 'Good standing'
                  : ms.integrityScore >= 60
                  ? 'Issues detected'
                  : 'Requires attention'}
              </p>
              <p className="text-xs text-dim mt-1">{ms.field}</p>
            </div>
          </div>

          {/* Stats */}
          {[
            {
              label: 'Citations checked',
              value: ms.citationsTotal,
              colorClass: 'text-ink',
              sub: `${ms.citationsVerified} verified &middot; ${ms.citationsPending} pending`,
            },
            {
              label: 'Flagged / Not found',
              value: ms.citationsFlagged + ms.citationsNotFound,
              colorClass: 'text-amber',
              sub: `${ms.citationsFlagged} semantic &middot; ${ms.citationsNotFound} missing`,
            },
            {
              label: 'Retracted sources',
              value: ms.citationsRetracted,
              colorClass: ms.citationsRetracted > 0 ? 'text-scarlet' : 'text-teal',
              sub: ms.citationsRetracted > 0 ? 'Immediate attention required' : 'None detected',
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
                className={`font-serif font-bold mb-1 ${card.colorClass}`}
                style={{ fontSize: 30 }}
              >
                {card.value}
              </p>
              <p
                className="text-xs text-dim"
                dangerouslySetInnerHTML={{ __html: card.sub }}
              />
            </div>
          ))}
        </div>

        {/* Citation table */}
        <div
          className="bg-surface rounded-lg"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          {/* Controls */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3"
            style={{ borderBottom: '1px solid var(--color-rule)' }}
          >
            {/* Filter tabs */}
            <div className="flex items-center gap-0.5 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                    filter === f.value
                      ? 'bg-muted text-ink'
                      : 'text-dim hover:text-ink hover:bg-muted/50'
                  }`}
                >
                  {f.label}
                  <span className={`ml-1 font-mono ${filterColor[f.value]}`}>{f.count}</span>
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search citations&hellip;"
              className="border border-rule rounded bg-canvas text-ink text-sm px-3 py-1.5 transition-colors w-full sm:w-56"
              style={{ outline: 'none' }}
              aria-label="Search citations"
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-teal)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
            />
          </div>

          {/* Column headers */}
          <div
            className="flex items-center gap-4 px-4 py-2.5 bg-muted/20"
            style={{ borderBottom: '1px solid var(--color-rule)' }}
          >
            <span
              className="font-mono text-dim uppercase tracking-wider text-right flex-shrink-0"
              style={{ width: 24, fontSize: 10 }}
            >
              #
            </span>
            <span
              className="font-mono text-dim uppercase tracking-wider flex-1"
              style={{ fontSize: 10 }}
            >
              Citation
            </span>
            <span
              className="font-mono text-dim uppercase tracking-wider flex-shrink-0"
              style={{ width: 128, textAlign: 'center', fontSize: 10 }}
            >
              Status
            </span>
            <span
              className="font-mono text-dim uppercase tracking-wider flex-shrink-0 hidden lg:block"
              style={{ width: 160, fontSize: 10 }}
            >
              DOI
            </span>
            <span style={{ width: 16 }} />
          </div>

          {/* Rows */}
          <div>
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-dim text-sm">No citations match this filter.</p>
              </div>
            ) : (
              filtered.map((citation) => (
                <CitationRow
                  key={citation.id}
                  citation={citation}
                  onViewDetail={() => onNavigate('citation-detail')}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--color-rule)' }}
          >
            <p className="font-mono text-dim" style={{ fontSize: 11 }}>
              Showing {filtered.length} of {ms.citationsTotal} citations
            </p>
            <p className="font-mono text-dim" style={{ fontSize: 11 }}>
              CrossRef &middot; OpenAlex &middot; Semantic Scholar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
