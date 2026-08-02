import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import Button from './Button'

interface Props {
  onFile?: (file: File) => void
  state?: 'idle' | 'dragging' | 'uploading' | 'error'
  progress?: number
  errorMessage?: string
}

export default function UploadDropzone({ onFile, state: externalState, progress: externalProgress, errorMessage }: Props) {
  const [internalState, setInternalState] = useState<'idle' | 'dragging' | 'uploading' | 'error'>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const state = externalState ?? internalState
  const progress = externalProgress ?? uploadProgress

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (!externalState && internalState === 'idle') setInternalState('dragging')
  }

  const handleDragLeave = () => {
    if (!externalState && internalState === 'dragging') setInternalState('idle')
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && !externalState) handleFile(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = (file: File) => {
    const valid = file.type === 'application/pdf' || file.name.endsWith('.docx')
    if (!valid) {
      setInternalState('error')
      return
    }
    setInternalState('uploading')
    let p = 0
    const interval = setInterval(() => {
      p += 14
      setUploadProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(interval)
        onFile?.(file)
      }
    }, 120)
  }

  const isClickable = state === 'idle' && !externalState

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => isClickable && inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && isClickable && inputRef.current?.click()}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label="Upload manuscript — PDF or DOCX"
      className={`relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        state === 'idle'
          ? 'border-rule bg-surface hover:border-teal/50 hover:bg-teal-pale/20 cursor-pointer'
          : state === 'dragging'
          ? 'border-teal bg-teal-pale/40 scale-[1.01] cursor-copy'
          : state === 'uploading'
          ? 'border-rule bg-surface cursor-default'
          : 'border-scarlet bg-scarlet-pale/30 cursor-default'
      }`}
      style={{ minHeight: 220, padding: '40px 32px' }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf"
        className="sr-only"
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {state === 'idle' && (
        <>
          <div className="mb-4 text-dim" style={{ fontSize: 32 }} aria-hidden="true">
            ↑
          </div>
          <p className="font-serif font-semibold text-ink mb-2" style={{ fontSize: 18 }}>
            Drop your manuscript here
          </p>
          <p className="text-dim text-sm mb-4">
            or{' '}
            <span className="text-teal underline underline-offset-2">browse files</span>
          </p>
          <p className="text-xs text-dim font-mono">PDF or DOCX · Max 50 MB</p>
        </>
      )}

      {state === 'dragging' && (
        <>
          <div className="mb-4 text-teal" style={{ fontSize: 36 }} aria-hidden="true">
            ↓
          </div>
          <p className="font-serif font-semibold text-teal" style={{ fontSize: 18 }}>
            Release to upload
          </p>
        </>
      )}

      {state === 'uploading' && (
        <div className="w-full max-w-xs flex flex-col items-center">
          <p className="font-medium text-ink text-sm mb-5 text-center">Uploading manuscript…</p>
          <div
            className="w-full bg-muted rounded-full"
            style={{ height: 4 }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Upload progress: ${progress}%`}
          >
            <div
              className="bg-teal rounded-full transition-all"
              style={{ height: 4, width: `${externalState ? 60 : progress}%` }}
            />
          </div>
          <p className="text-dim font-mono text-xs mt-2">{externalState ? '60' : progress}%</p>
        </div>
      )}

      {state === 'error' && (
        <>
          <div className="mb-4 text-scarlet" style={{ fontSize: 32 }} aria-hidden="true">
            ✕
          </div>
          <p className="font-serif font-semibold text-scarlet mb-2" style={{ fontSize: 18 }}>
            Upload failed
          </p>
          <p className="text-scarlet/80 text-sm mb-5 text-center" style={{ maxWidth: 280 }}>
            {errorMessage ?? 'File format not supported. Please upload a PDF or DOCX.'}
          </p>
          {!externalState && (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setInternalState('idle')
              }}
            >
              Try again
            </Button>
          )}
        </>
      )}
    </div>
  )
}
