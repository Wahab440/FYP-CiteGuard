import { useState, type FormEvent } from 'react'
import type { Screen } from '../types'
import Button from '../components/Button'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function LoginScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNavigate('upload')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-14"
        style={{ width: '54%', background: '#161513' }}
      >
        <div>
          <span
            className="font-serif font-bold tracking-tight"
            style={{ fontSize: 20, color: '#F5F4EF' }}
          >
            CiteGuard
          </span>
        </div>

        <div>
          <h1
            className="font-serif font-bold leading-tight mb-6"
            style={{ fontSize: 46, color: '#F5F4EF', letterSpacing: '-0.5px' }}
          >
            Citation integrity<br />
            <em style={{ color: 'var(--color-teal-pale)', fontStyle: 'italic' }}>
              before it matters.
            </em>
          </h1>
          <p style={{ fontSize: 17, color: '#A8A6A0', lineHeight: 1.65, maxWidth: 400 }}>
            Verify every reference in your manuscript against live academic databases,
            retraction notices, and AI semantic analysis &mdash; before you submit.
          </p>

          <div className="mt-12 flex flex-col gap-5">
            {[
              {
                label: 'Source verification',
                desc: 'Checks CrossRef, OpenAlex & Semantic Scholar in real time',
              },
              {
                label: 'Retraction detection',
                desc: 'Flags withdrawn publications against global retraction databases',
              },
              {
                label: 'Semantic analysis',
                desc: 'AI compares your claims to what sources actually say',
              },
            ].map((f) => (
              <div key={f.label} className="flex gap-4 items-start">
                <span style={{ color: 'var(--color-teal-pale)', fontSize: 15, marginTop: 3 }}>
                  ✓
                </span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#F5F4EF', marginBottom: 2 }}>
                    {f.label}
                  </p>
                  <p style={{ fontSize: 13, color: '#6B6966' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: '#3A3835' }}>
            Used by researchers at 40+ universities &middot; GDPR compliant &middot; SOC 2 Type II
          </p>
        </div>
      </div>

      {/* Right — auth form */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <span className="font-serif font-bold text-ink" style={{ fontSize: 20 }}>
              CiteGuard
            </span>
          </div>

          <h2 className="font-serif font-bold text-ink mb-1.5" style={{ fontSize: 26 }}>
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>
          <p className="text-dim text-sm mb-8">
            {mode === 'signin'
              ? 'Enter your credentials to continue.'
              : 'Start verifying your manuscripts today.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-dim uppercase tracking-wider mb-1.5"
                  style={{ fontSize: 11 }}
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-rule rounded bg-surface text-ink text-sm px-3 py-2.5 transition-colors"
                  style={{ outline: 'none' }}
                  placeholder="Dr. Sarah Chen"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-teal)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-dim uppercase tracking-wider mb-1.5"
                style={{ fontSize: 11 }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-rule rounded bg-surface text-ink text-sm px-3 py-2.5 transition-colors"
                style={{ outline: 'none' }}
                placeholder="you@university.edu"
                required
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-teal)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-semibold text-dim uppercase tracking-wider mb-1.5"
                style={{ fontSize: 11 }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-rule rounded bg-surface text-ink text-sm px-3 py-2.5 transition-colors"
                style={{ outline: 'none' }}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-teal)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="institution"
                  className="block font-semibold text-dim uppercase tracking-wider mb-1.5"
                  style={{ fontSize: 11 }}
                >
                  Institution
                </label>
                <input
                  id="institution"
                  type="text"
                  className="w-full border border-rule rounded bg-surface text-ink text-sm px-3 py-2.5 transition-colors"
                  style={{ outline: 'none' }}
                  placeholder="MIT, Stanford, UCL&hellip;"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-teal)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
              </div>
            )}

            <Button type="submit" className="mt-1 w-full" size="lg">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          {mode === 'signin' && (
            <div className="mt-3 text-right">
              <button className="text-xs text-dim hover:text-teal cursor-pointer transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <p className="text-sm text-dim mt-5 text-center">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="text-teal hover:underline cursor-pointer font-medium"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>

          <div className="mt-8 pt-7" style={{ borderTop: '1px solid var(--color-rule)' }}>
            <p className="text-xs text-dim text-center mb-3">Or continue with your institution</p>
            <Button variant="secondary" className="w-full" size="md">
              Institutional SSO / Shibboleth
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
