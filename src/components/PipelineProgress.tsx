export interface PipelineStep {
  id: string
  label: string
  description: string
  status: 'complete' | 'active' | 'pending' | 'error'
  detail?: string
}

interface Props {
  steps: PipelineStep[]
}

export default function PipelineProgress({ steps }: Props) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={step.id} className="flex gap-5">
          {/* Node + connector */}
          <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-medium border-2 transition-all flex-shrink-0 ${
                step.status === 'complete'
                  ? 'bg-teal-pale border-teal text-teal'
                  : step.status === 'active'
                  ? 'bg-teal border-teal text-white'
                  : step.status === 'error'
                  ? 'bg-scarlet-pale border-scarlet text-scarlet'
                  : 'bg-surface border-rule text-dim'
              }`}
              aria-label={`Step ${step.label}: ${step.status}`}
            >
              {step.status === 'complete' ? '✓' : step.status === 'error' ? '✕' : step.status === 'active' ? '●' : '○'}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-px flex-1 my-1 ${step.status === 'complete' ? 'bg-teal/30' : 'bg-rule'}`}
                style={{ minHeight: 28 }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Content */}
          <div className={i < steps.length - 1 ? 'pb-7' : 'pb-0'}>
            <p
              className={`font-medium text-sm leading-tight mt-1 mb-0.5 ${
                step.status === 'active'
                  ? 'text-ink'
                  : step.status === 'complete'
                  ? 'text-dim'
                  : step.status === 'error'
                  ? 'text-scarlet'
                  : 'text-dim'
              }`}
            >
              {step.label}
            </p>
            <p className="text-dim text-xs leading-relaxed">{step.description}</p>
            {step.detail && step.status === 'active' && (
              <p className="text-teal text-xs mt-1 font-mono">{step.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
