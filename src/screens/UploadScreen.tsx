import type { Screen } from '../types'
import UploadDropzone from '../components/UploadDropzone'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

const howItWorks = [
  {
    number: '01',
    title: 'Upload your manuscript',
    desc: 'PDF or Word document up to 50 MB. CiteGuard extracts every in-text citation and reference-list entry automatically.',
  },
  {
    number: '02',
    title: 'Automated verification',
    desc: 'Each citation is checked against CrossRef, OpenAlex, and Semantic Scholar for existence, retraction status, and open-access availability.',
  },
  {
    number: '03',
    title: 'Semantic integrity check',
    desc: 'An AI model running locally compares what you claim each source says against its actual abstract, and flags misrepresentations.',
  },
]

export default function UploadScreen({ onNavigate }: Props) {
  const handleFile = () => {
    setTimeout(() => onNavigate('processing'), 900)
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Header */}
      <header
        className="bg-surface px-8 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        <span className="font-serif font-bold text-ink" style={{ fontSize: 17 }}>
          CiteGuard
        </span>
        <div className="flex items-center gap-4">
          <button
            className="text-sm text-dim hover:text-ink transition-colors cursor-pointer"
            onClick={() => onNavigate('batch')}
          >
            Batch upload &rarr;
          </button>
          <div
            className="w-px bg-rule"
            style={{ height: 18 }}
            aria-hidden="true"
          />
          <button className="text-sm text-dim hover:text-ink transition-colors cursor-pointer">
            Dr. Sarah Chen
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full" style={{ maxWidth: 680 }}>
          <div className="mb-8 text-center">
            <h1
              className="font-serif font-bold text-ink mb-3"
              style={{ fontSize: 30 }}
            >
              Upload your manuscript
            </h1>
            <p className="text-dim text-sm leading-relaxed" style={{ maxWidth: 460, margin: '0 auto' }}>
              Upload a PDF or Word document and CiteGuard will verify every citation
              before your submission.
            </p>
          </div>

          <UploadDropzone onFile={handleFile} />

          {/* Recent manuscripts */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p
                className="font-semibold text-dim uppercase tracking-widest"
                style={{ fontSize: 10 }}
              >
                Recent manuscripts
              </p>
              <button className="text-xs text-teal hover:underline cursor-pointer">
                View all
              </button>
            </div>
            <div
              className="bg-surface rounded-lg divide-y divide-rule"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              {[
                {
                  name: 'neural_memory_draft_v3.pdf',
                  date: 'Jan 12, 2024',
                  score: 91,
                  status: 'Verified',
                },
                {
                  name: 'climate_ecosystems_final.pdf',
                  date: 'Jan 8, 2024',
                  score: 84,
                  status: 'Issues',
                },
                {
                  name: 'antibiotic_resistance_v2.docx',
                  date: 'Dec 29, 2023',
                  score: 78,
                  status: 'Issues',
                },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => onNavigate('dashboard')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onNavigate('dashboard')}
                  aria-label={`Open ${doc.name}, score ${doc.score}/100`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-dim" style={{ fontSize: 18 }} aria-hidden="true">
                      ◻
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{doc.name}</p>
                      <p className="text-xs text-dim">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-medium text-xs ${doc.score >= 85 ? 'text-teal' : 'text-amber'}`}
                    >
                      {doc.score}/100
                    </span>
                    <span className="text-dim text-sm" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* How it works */}
      <section
        className="bg-surface px-8 py-10"
        style={{ borderTop: '1px solid var(--color-rule)' }}
      >
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <p
            className="font-semibold text-dim uppercase tracking-widest text-center mb-7"
            style={{ fontSize: 10 }}
          >
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span
                  className="font-mono font-bold text-teal flex-shrink-0 leading-snug"
                  style={{ fontSize: 20 }}
                >
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1.5">{step.title}</p>
                  <p className="text-dim text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
