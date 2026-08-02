import { useState, useEffect } from 'react'
import type { Screen } from '../types'
import PipelineProgress, { type PipelineStep } from '../components/PipelineProgress'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

const stepDefs = [
  {
    id: 'extract',
    label: 'Extracting citations',
    description: 'Parsing reference list and in-text citations from manuscript.',
  },
  {
    id: 'verify',
    label: 'Cross-referencing databases',
    description: 'Checking each citation against CrossRef, OpenAlex, and Semantic Scholar.',
  },
  {
    id: 'retract',
    label: 'Checking retractions & open access',
    description: 'Querying retraction databases and verifying open-access availability.',
  },
  {
    id: 'semantic',
    label: 'Semantic integrity analysis',
    description: 'AI model comparing manuscript claims to source abstracts.',
  },
  {
    id: 'report',
    label: 'Generating report',
    description: 'Compiling verification results and computing integrity score.',
  },
]

const stepDurations = [1400, 900, 700, 1200, 600]

export default function ProcessingScreen({ onNavigate }: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [citationsProcessed, setCitationsProcessed] = useState(0)
  const totalCitations = 43

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (currentStep >= stepDefs.length) return
    const t = setTimeout(
      () => setCurrentStep((s) => s + 1),
      stepDurations[currentStep] ?? 1000
    )
    return () => clearTimeout(t)
  }, [currentStep])

  useEffect(() => {
    if (currentStep !== 1) return
    const t = setInterval(() => setCitationsProcessed((n) => Math.min(n + 4, totalCitations)), 80)
    return () => clearInterval(t)
  }, [currentStep])

  const steps: PipelineStep[] = stepDefs.map((s, i) => ({
    ...s,
    status:
      i < currentStep ? 'complete' : i === currentStep ? 'active' : 'pending',
    detail:
      i === currentStep && i === 1
        ? `Checking citation ${citationsProcessed} of ${totalCitations}…`
        : undefined,
  }))

  const done = currentStep >= stepDefs.length
  const pct = Math.round((currentStep / stepDefs.length) * 100)

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-canvas"
    >
      <div style={{ width: '100%', maxWidth: 480 }}>
        {/* Manuscript label */}
        <div className="mb-10 text-center">
          <p
            className="font-semibold text-dim uppercase tracking-widest mb-3"
            style={{ fontSize: 10 }}
          >
            {done ? 'Analysis complete' : 'Analyzing manuscript'}
          </p>
          <h1 className="font-serif font-bold text-ink leading-snug mb-2" style={{ fontSize: 20 }}>
            Advances in Computational Biology
          </h1>
          <p className="text-dim text-sm">
            Dr. Sarah Chen &middot; MIT &middot; {totalCitations} citations
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div
            className="w-full bg-muted rounded-full"
            style={{ height: 3 }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Analysis progress: ${pct}%`}
          >
            <div
              className="bg-teal rounded-full transition-all"
              style={{ height: 3, width: `${pct}%`, transition: 'width 0.5s ease' }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="font-mono text-dim" style={{ fontSize: 11 }}>
              {done ? 'Complete' : `Step ${Math.min(currentStep + 1, stepDefs.length)} of ${stepDefs.length}`}
            </span>
            <span className="font-mono text-dim" style={{ fontSize: 11 }}>
              {formatTime(elapsed)} elapsed
            </span>
          </div>
        </div>

        {/* Pipeline steps */}
        <div
          className="bg-surface rounded-lg p-8 mb-6"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          <PipelineProgress steps={steps} />
        </div>

        {/* CTA on completion */}
        {done ? (
          <div className="text-center">
            <p className="text-sm text-dim mb-5">
              43 citations verified &middot; 7 flagged &middot; 1 retracted
            </p>
            <Button size="lg" onClick={() => onNavigate('dashboard')}>
              View results &rarr;
            </Button>
          </div>
        ) : (
          <p className="text-center text-xs font-mono text-dim">
            You can safely close this tab &mdash; results will be ready when you return.
          </p>
        )}
      </div>
    </div>
  )
}
