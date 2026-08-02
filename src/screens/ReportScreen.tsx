import type { Screen } from '../types'
import { mainManuscript } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import ScoreIndicator from '../components/ScoreIndicator'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function ReportScreen({ onNavigate }: Props) {
  const ms = mainManuscript
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const retracted = ms.citations.filter((c) => c.status === 'retracted')
  const flagged = ms.citations.filter((c) => c.status === 'flagged')
  const notFound = ms.citations.filter((c) => c.status === 'not-found')
  const verified = ms.citations.filter((c) => c.status === 'verified' || c.status === 'open-access')

  return (
    <div className="min-h-screen bg-canvas">
      {/* Screen-only controls */}
      <div
        className="bg-surface px-8 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <button
          className="text-sm text-teal hover:underline cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          &larr; Back to dashboard
        </button>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">
            Print
          </Button>
          <Button size="sm">Download PDF &darr;</Button>
        </div>
      </div>

      {/* Report body */}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 32px' }}>
        {/* Header */}
        <div
          className="pb-8 mb-8"
          style={{ borderBottom: '2px solid var(--color-ink)' }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p
                className="font-mono text-dim uppercase tracking-widest mb-3"
                style={{ fontSize: 11 }}
              >
                Citation Integrity Report
              </p>
              <h1
                className="font-serif font-bold text-ink leading-snug mb-3"
                style={{ fontSize: 24 }}
              >
                {ms.title}
              </h1>
              <p className="text-dim text-sm">{ms.author}</p>
              <p className="text-dim text-sm">{ms.institution}</p>
              <p className="text-dim text-sm mt-0.5">{ms.field}</p>
            </div>
            <ScoreIndicator score={ms.integrityScore} size="md" />
          </div>

          <div
            className="flex gap-4 mt-6 font-mono text-dim flex-wrap"
            style={{ fontSize: 11 }}
          >
            <span>Report generated: {reportDate}</span>
            <span>&middot;</span>
            <span>Verified by CiteGuard</span>
            <span>&middot;</span>
            <span>Report ID: CG-2024-001542</span>
          </div>
        </div>

        {/* Verification summary */}
        <section className="mb-10">
          <h2 className="font-serif font-semibold text-ink mb-4" style={{ fontSize: 18 }}>
            Verification Summary
          </h2>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Total citations checked', ms.citationsTotal],
                ['Verified', ms.citationsVerified],
                ['Open access', ms.citations.filter((c) => c.isOpenAccess).length],
                ['Flagged (semantic mismatch)', ms.citationsFlagged],
                ['Source not found', ms.citationsNotFound],
                ['Retracted sources', ms.citationsRetracted],
                ['Overall integrity score', `${ms.integrityScore}/100`],
              ].map(([label, value]) => (
                <tr key={String(label)} style={{ borderBottom: '1px solid var(--color-rule)' }}>
                  <td className="py-2.5 text-dim">{label}</td>
                  <td className="py-2.5 text-right font-mono font-medium text-ink">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Issues requiring attention */}
        {(retracted.length > 0 || flagged.length > 0 || notFound.length > 0) && (
          <section className="mb-10">
            <h2 className="font-serif font-semibold text-ink mb-4" style={{ fontSize: 18 }}>
              Issues Requiring Attention
            </h2>

            {retracted.map((c) => (
              <div
                key={c.id}
                className="bg-scarlet-pale rounded-lg p-4 mb-3"
                style={{ border: '1px solid rgba(184,45,24,0.25)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status="retracted" size="sm" />
                  <span className="font-mono text-dim" style={{ fontSize: 11 }}>
                    Ref. {c.index}
                  </span>
                </div>
                <p className="font-semibold text-ink text-sm mb-1">{c.title}</p>
                <p className="text-sm text-dim">
                  {c.authors} &middot; {c.journal} &middot; {c.year}
                </p>
                {c.retractionNotice && (
                  <p className="text-sm text-scarlet/80 mt-2 leading-relaxed">
                    {c.retractionNotice}
                  </p>
                )}
              </div>
            ))}

            {flagged.map((c) => (
              <div
                key={c.id}
                className="bg-amber-pale/40 rounded-lg p-4 mb-3"
                style={{ border: '1px solid rgba(138,92,10,0.2)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status="flagged" size="sm" />
                  <span className="font-mono text-dim" style={{ fontSize: 11 }}>
                    Ref. {c.index} &middot; Match: {c.semanticScore}%
                  </span>
                </div>
                <p className="font-semibold text-ink text-sm mb-1">{c.title}</p>
                <p className="text-sm text-dim mb-2">
                  {c.authors} &middot; {c.journal} &middot; {c.year}
                </p>
                {c.semanticAnalysis && (
                  <p className="text-sm text-ink-2 leading-relaxed">{c.semanticAnalysis}</p>
                )}
              </div>
            ))}

            {notFound.map((c) => (
              <div
                key={c.id}
                className="bg-muted/60 rounded-lg p-4 mb-3"
                style={{ border: '1px solid var(--color-rule)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status="not-found" size="sm" />
                  <span className="font-mono text-dim" style={{ fontSize: 11 }}>
                    Ref. {c.index}
                  </span>
                </div>
                <p className="font-semibold text-ink text-sm">{c.title}</p>
                <p className="text-sm text-dim">
                  {c.authors} &middot; {c.journal} &middot; {c.year}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Verified citations table */}
        <section className="mb-10">
          <h2 className="font-serif font-semibold text-ink mb-4" style={{ fontSize: 18 }}>
            Verified Citations
          </h2>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-rule)' }}>
                {['#', 'Authors', 'Title', 'Year'].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-2 font-mono font-semibold text-dim uppercase tracking-wider pr-4"
                    style={{ fontSize: 10 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {verified.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(221,218,212,0.5)' }}>
                  <td className="py-2.5 pr-4 font-mono text-dim" style={{ fontSize: 11 }}>
                    {c.index}
                  </td>
                  <td className="py-2.5 pr-4 text-dim text-xs">
                    {c.authors.split(',')[0]}
                    {c.authors.includes(',') ? ' et al.' : ''}
                  </td>
                  <td className="py-2.5 pr-4 text-ink">
                    {c.title}
                    {c.isOpenAccess && (
                      <span
                        className="ml-2 text-cobalt font-mono"
                        style={{ fontSize: 10 }}
                        aria-label="Open Access"
                      >
                        OA
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 font-mono text-dim" style={{ fontSize: 11 }}>
                    {c.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <div
          className="pt-6 flex items-center justify-between font-mono text-dim"
          style={{ borderTop: '1px solid var(--color-rule)', fontSize: 11 }}
        >
          <span>CiteGuard &middot; citeguard.io</span>
          <span>CrossRef &middot; OpenAlex &middot; Semantic Scholar</span>
        </div>
      </div>
    </div>
  )
}
