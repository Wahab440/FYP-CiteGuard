import { useState } from 'react'
import type { Screen } from '../types'
import StatusBadge from '../components/StatusBadge'
import ScoreIndicator from '../components/ScoreIndicator'
import Button from '../components/Button'
import PipelineProgress from '../components/PipelineProgress'
import UploadDropzone from '../components/UploadDropzone'
import CitationRow from '../components/CitationRow'
import { mainManuscript } from '../data/mockData'

interface Props {
  onNavigate: (screen: Screen) => void
}

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div
        className="flex items-baseline gap-4 mb-6 pb-3"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <h2 className="font-serif font-semibold text-ink" style={{ fontSize: 20 }}>
          {title}
        </h2>
        {note && (
          <span className="font-mono text-dim" style={{ fontSize: 11 }}>
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

export default function ComponentsScreen({ onNavigate }: Props) {
  const steps = [
    {
      id: '1',
      label: 'Extracting citations',
      description: 'Parsing reference list from document.',
      status: 'complete' as const,
    },
    {
      id: '2',
      label: 'Cross-referencing databases',
      description: 'Checking CrossRef, OpenAlex, Semantic Scholar.',
      status: 'active' as const,
      detail: 'Checking citation 23 of 43…',
    },
    {
      id: '3',
      label: 'Semantic analysis',
      description: 'Comparing claims to source abstracts.',
      status: 'pending' as const,
    },
    {
      id: '4',
      label: 'Generating report',
      description: 'Compiling results and integrity score.',
      status: 'pending' as const,
    },
  ]

  return (
    <div className="min-h-screen bg-canvas px-8 py-8">
      <header className="mb-10">
        <p
          className="font-semibold text-dim uppercase tracking-widest mb-1"
          style={{ fontSize: 10 }}
        >
          Design System
        </p>
        <h1 className="font-serif font-bold text-ink" style={{ fontSize: 34 }}>
          Component Library
        </h1>
        <p className="text-dim text-sm mt-2">All reusable components and their states.</p>
      </header>

      {/* Status Badge */}
      <Section title="Status Badge" note="All variants &middot; sm and md sizes">
        <div className="flex flex-wrap gap-3 mb-4">
          <StatusBadge status="verified" />
          <StatusBadge status="open-access" />
          <StatusBadge status="flagged" />
          <StatusBadge status="retracted" />
          <StatusBadge status="not-found" />
          <StatusBadge status="pending" />
        </div>
        <p className="font-mono text-dim mb-3" style={{ fontSize: 11 }}>
          size=&quot;sm&quot;
        </p>
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="verified" size="sm" />
          <StatusBadge status="open-access" size="sm" />
          <StatusBadge status="flagged" size="sm" />
          <StatusBadge status="retracted" size="sm" />
          <StatusBadge status="not-found" size="sm" />
          <StatusBadge status="pending" size="sm" />
        </div>
        <p className="text-xs text-dim mt-4 leading-relaxed" style={{ maxWidth: 540 }}>
          Status is conveyed by both color and a text label, meeting WCAG AA requirements.
          The icon (✓, ⚑, ✕, ◎, ?) provides an additional non-color cue.
        </p>
      </Section>

      {/* Score Indicator */}
      <Section title="Score Indicator" note="Three sizes &middot; three score tiers">
        <div className="flex items-end gap-12 flex-wrap">
          {[
            { score: 91, size: 'lg' as const, label: 'score=91 Good' },
            { score: 76, size: 'lg' as const, label: 'score=76 Issues' },
            { score: 43, size: 'lg' as const, label: 'score=43 Critical' },
            { score: 91, size: 'md' as const, label: 'size=md' },
            { score: 76, size: 'sm' as const, label: 'size=sm' },
          ].map(({ score, size, label }) => (
            <div key={`${score}-${size}`} className="flex flex-col items-center gap-3">
              <ScoreIndicator score={score} size={size} />
              <p className="font-mono text-dim" style={{ fontSize: 10 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-dim mt-6">
          Ring color: teal &ge;80 &middot; amber 60&ndash;79 &middot; scarlet &lt;60. Ring + numeric + label — never color alone.
        </p>
      </Section>

      {/* Buttons */}
      <Section title="Button" note="4 variants &middot; 3 sizes &middot; disabled states">
        <div className="space-y-4">
          <div>
            <p className="font-mono text-dim mb-3" style={{ fontSize: 11 }}>Variants (default size)</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
          <div>
            <p className="font-mono text-dim mb-3" style={{ fontSize: 11 }}>Disabled</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="ghost" disabled>Ghost</Button>
            </div>
          </div>
          <div>
            <p className="font-mono text-dim mb-3" style={{ fontSize: 11 }}>Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Pipeline Progress */}
      <Section title="Pipeline Progress" note="complete / active / pending states">
        <div
          className="bg-surface rounded-lg p-8"
          style={{ border: '1px solid var(--color-rule)', maxWidth: 440 }}
        >
          <PipelineProgress steps={steps} />
        </div>
        <div
          className="bg-surface rounded-lg p-8 mt-4"
          style={{ border: '1px solid var(--color-rule)', maxWidth: 440 }}
        >
          <PipelineProgress
            steps={[
              { id: 'a', label: 'All steps complete', description: 'All pipeline stages finished.', status: 'complete' },
              { id: 'b', label: 'Report generated', description: '43 citations verified.', status: 'complete' },
              { id: 'c', label: 'Results ready', description: 'View dashboard to explore results.', status: 'complete' },
            ]}
          />
        </div>
      </Section>

      {/* Upload Dropzone */}
      <Section title="Upload Dropzone" note="4 states">
        <div className="grid grid-cols-2 gap-5" style={{ maxWidth: 760 }}>
          {[
            { state: 'idle' as const, label: 'idle' },
            { state: 'dragging' as const, label: 'dragging' },
            { state: 'uploading' as const, label: 'uploading' },
            { state: 'error' as const, label: 'error' },
          ].map(({ state, label }) => (
            <div key={state}>
              <p className="font-mono text-dim mb-2" style={{ fontSize: 11 }}>
                state=&quot;{label}&quot;
              </p>
              <UploadDropzone
                state={state}
                errorMessage={state === 'error' ? 'File format not supported.' : undefined}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Citation Row */}
      <Section title="Citation Row" note="5 statuses shown &middot; click to expand">
        <div
          className="bg-surface rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          {/* Table header */}
          <div
            className="flex items-center gap-4 px-4 py-2.5 bg-muted/20"
            style={{ borderBottom: '1px solid var(--color-rule)' }}
          >
            {['#', 'Citation', 'Status', 'DOI'].map((h, i) => (
              <span
                key={h}
                className="font-mono text-dim uppercase tracking-wider"
                style={{
                  fontSize: 10,
                  width: i === 0 ? 24 : i === 1 ? undefined : i === 2 ? 128 : 160,
                  flex: i === 1 ? 1 : undefined,
                  display: i === 3 ? undefined : undefined,
                }}
              >
                {h}
              </span>
            ))}
            <span style={{ width: 16 }} />
          </div>
          {mainManuscript.citations.slice(0, 6).map((c) => (
            <CitationRow
              key={c.id}
              citation={c}
              onViewDetail={() => onNavigate('citation-detail')}
            />
          ))}
        </div>
        <p className="text-xs text-dim mt-3">
          Expand any row to see retraction notices, semantic mismatch analysis, or not-found guidance.
        </p>
      </Section>
    </div>
  )
}
