import type { Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
}

function Swatch({
  color,
  name,
  hex,
  textDark = false,
}: {
  color: string
  name: string
  hex: string
  textDark?: boolean
}) {
  return (
    <div>
      <div
        className="h-14 rounded-lg mb-2"
        style={{ background: color, border: '1px solid rgba(0,0,0,0.06)' }}
      />
      <p
        className={`font-semibold text-xs ${textDark ? 'text-ink' : 'text-ink'}`}
        style={{ fontSize: 12 }}
      >
        {name}
      </p>
      <p className="font-mono text-dim" style={{ fontSize: 11 }}>
        {hex}
      </p>
    </div>
  )
}

export default function StyleGuideScreen({ onNavigate }: Props) {
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
          Style Guide
        </h1>
        <p className="text-dim text-sm mt-2" style={{ maxWidth: 500 }}>
          Color tokens, typography scale, spacing grid, and border/radius values for CiteGuard.
        </p>
      </header>

      {/* ── Color ── */}
      <section className="mb-14">
        <h2 className="font-serif font-semibold text-ink mb-6 pb-3" style={{ fontSize: 22, borderBottom: '1px solid var(--color-rule)' }}>
          Color
        </h2>

        {/* Base */}
        <div className="mb-8">
          <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
            Base palette
          </p>
          <div className="grid grid-cols-6 gap-4">
            <Swatch color="#F5F4EF" name="Canvas" hex="#F5F4EF" />
            <Swatch color="#FFFFFF" name="Surface" hex="#FFFFFF" />
            <Swatch color="#EDECEA" name="Muted" hex="#EDECEA" />
            <Swatch color="#DDDAD4" name="Rule" hex="#DDDAD4" />
            <Swatch color="#6B6966" name="Dim" hex="#6B6966" />
            <Swatch color="#161513" name="Ink" hex="#161513" />
          </div>
        </div>

        {/* Teal accent */}
        <div className="mb-8">
          <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
            Accent &mdash; Teal (primary)
          </p>
          <div className="grid grid-cols-4 gap-4">
            <Swatch color="#E4F0EC" name="Teal Pale" hex="#E4F0EC" />
            <Swatch color="#2D8B73" name="Teal Mid" hex="#2D8B73" />
            <Swatch color="#1B6A57" name="Teal" hex="#1B6A57" />
            <Swatch color="#0F4236" name="Teal Dark" hex="#0F4236" />
          </div>
        </div>

        {/* Status colors */}
        <div>
          <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-5" style={{ fontSize: 10 }}>
            Status colors
          </p>
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: 'Verified', pale: '#E4F0EC', base: '#1B6A57', paleName: 'Verified Pale', baseName: 'Verified' },
              { label: 'Flagged', pale: '#FEF2DC', base: '#8A5C0A', paleName: 'Flagged Pale', baseName: 'Flagged' },
              { label: 'Retracted', pale: '#FBEBE7', base: '#B82D18', paleName: 'Retracted Pale', baseName: 'Retracted' },
              { label: 'Open Access', pale: '#E4EDF9', base: '#1B58A2', paleName: 'OA Pale', baseName: 'Open Access' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xs font-semibold text-dim uppercase tracking-wide mb-3">
                  {s.label}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Swatch color={s.pale} name={s.paleName} hex={s.pale} />
                  <Swatch color={s.base} name={s.baseName} hex={s.base} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="mb-14">
        <h2 className="font-serif font-semibold text-ink mb-6 pb-3" style={{ fontSize: 22, borderBottom: '1px solid var(--color-rule)' }}>
          Typography
        </h2>

        {/* Type scale */}
        <div
          className="bg-surface rounded-lg mb-8 overflow-hidden"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          {[
            { label: 'Display', size: 36, weight: 700, family: 'Lora', className: 'font-serif font-bold' },
            { label: 'H1', size: 28, weight: 700, family: 'Lora', className: 'font-serif font-bold' },
            { label: 'H2', size: 22, weight: 600, family: 'Lora', className: 'font-serif font-semibold' },
            { label: 'H3', size: 18, weight: 600, family: 'Lora', className: 'font-serif font-semibold' },
            { label: 'Body large', size: 16, weight: 400, family: 'Inter', className: 'font-sans' },
            { label: 'Body', size: 14, weight: 400, family: 'Inter', className: 'font-sans' },
            { label: 'Small', size: 12, weight: 400, family: 'Inter', className: 'font-sans' },
            { label: 'Label', size: 11, weight: 600, family: 'Inter', className: 'font-sans font-semibold uppercase tracking-widest' },
            { label: 'Mono data', size: 12, weight: 400, family: 'JetBrains Mono', className: 'font-mono' },
            { label: 'Mono bold', size: 12, weight: 500, family: 'JetBrains Mono', className: 'font-mono font-medium' },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-baseline gap-6 px-5 py-3"
              style={{ borderBottom: '1px solid var(--color-rule)' }}
            >
              <div className="flex-shrink-0" style={{ width: 120 }}>
                <p className="font-mono text-dim" style={{ fontSize: 10 }}>
                  {t.label}
                </p>
                <p className="font-mono text-dim/60" style={{ fontSize: 10 }}>
                  {t.family} &middot; {t.size}px
                </p>
              </div>
              <p
                className={`text-ink ${t.className}`}
                style={{ fontSize: t.size }}
              >
                Citation integrity analysis
              </p>
            </div>
          ))}
        </div>

        {/* Font specimens */}
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              name: 'Lora (Serif)',
              usage: 'Headings, display text, blockquotes',
              sample: 'Aa Bb Cc Dd Ee',
              chars: 'abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789',
              extra: <em style={{ fontFamily: 'Lora, serif', fontSize: 13, color: 'var(--color-dim)' }}>Italic for claimed-text emphasis</em>,
              className: 'font-serif',
            },
            {
              name: 'Inter (Sans)',
              usage: 'UI text, labels, captions, form inputs',
              sample: 'Aa Bb Cc Dd Ee',
              chars: 'abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789',
              extra: <span className="text-dim text-sm">Secondary weight for labels</span>,
              className: 'font-sans',
            },
            {
              name: 'JetBrains Mono',
              usage: 'DOIs, scores, IDs, status labels, code',
              sample: 'Aa Bb 01 []',
              chars: 'abcdefghijklmnop\nABCDEFGHIJKLMNOP\n0123456789 ·',
              extra: <span className="font-mono text-teal text-sm">10.1038/s41592-021-01084-3</span>,
              className: 'font-mono',
            },
          ].map((f) => (
            <div
              key={f.name}
              className="bg-surface rounded-lg p-5"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-1" style={{ fontSize: 10 }}>
                {f.name}
              </p>
              <p className="text-xs text-dim mb-4">{f.usage}</p>
              <p className={`text-ink mb-3 ${f.className}`} style={{ fontSize: 22 }}>
                {f.sample}
              </p>
              <p className={`text-ink text-sm leading-relaxed whitespace-pre-line ${f.className}`}>
                {f.chars}
              </p>
              <div className="mt-3">{f.extra}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Spacing ── */}
      <section className="mb-14">
        <h2 className="font-serif font-semibold text-ink mb-6 pb-3" style={{ fontSize: 22, borderBottom: '1px solid var(--color-rule)' }}>
          Spacing Grid
        </h2>
        <p className="text-sm text-dim mb-6">8px base grid. All values are multiples of 4px (Tailwind units).</p>
        <div className="flex items-end gap-5 flex-wrap">
          {[
            { px: 4, label: '4', tw: 'p-1' },
            { px: 8, label: '8', tw: 'p-2' },
            { px: 12, label: '12', tw: 'p-3' },
            { px: 16, label: '16', tw: 'p-4' },
            { px: 20, label: '20', tw: 'p-5' },
            { px: 24, label: '24', tw: 'p-6' },
            { px: 32, label: '32', tw: 'p-8' },
            { px: 40, label: '40', tw: 'p-10' },
            { px: 48, label: '48', tw: 'p-12' },
            { px: 64, label: '64', tw: 'p-16' },
            { px: 80, label: '80', tw: 'p-20' },
          ].map(({ px, label, tw }) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <div
                className="bg-teal/20 rounded"
                style={{ width: 16, height: px, background: 'var(--color-teal-pale)', border: '1px solid rgba(27,106,87,0.2)' }}
              />
              <span className="font-mono text-dim" style={{ fontSize: 10 }}>
                {label}
              </span>
              <span className="font-mono text-dim/60" style={{ fontSize: 9 }}>
                {tw}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Border & Radius ── */}
      <section className="mb-14">
        <h2 className="font-serif font-semibold text-ink mb-6 pb-3" style={{ fontSize: 22, borderBottom: '1px solid var(--color-rule)' }}>
          Border &amp; Radius
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
              Border weight
            </p>
            <div className="flex flex-col gap-4">
              {[
                { weight: 1, label: '1px &mdash; default divider, card border' },
                { weight: 2, label: '2px &mdash; section divider, report header' },
              ].map(({ weight, label }) => (
                <div key={weight} className="flex items-center gap-4">
                  <span className="font-mono text-dim" style={{ fontSize: 11, width: 24 }}>
                    {weight}px
                  </span>
                  <div
                    className="flex-1"
                    style={{ borderBottom: `${weight}px solid var(--color-rule)` }}
                  />
                  <span
                    className="text-dim"
                    style={{ fontSize: 12 }}
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono font-semibold text-dim uppercase tracking-widest mb-4" style={{ fontSize: 10 }}>
              Corner radius
            </p>
            <div className="flex gap-6 items-end">
              {[
                { r: 4, label: 'Badge', sub: '4px' },
                { r: 6, label: 'Default', sub: '6px' },
                { r: 8, label: 'Card', sub: '8px' },
                { r: 0, label: 'None', sub: '0px' },
              ].map(({ r, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-surface"
                    style={{
                      width: 60,
                      height: 40,
                      borderRadius: r,
                      border: '1px solid var(--color-rule)',
                    }}
                  />
                  <p className="text-xs font-medium text-ink">{label}</p>
                  <p className="font-mono text-dim" style={{ fontSize: 10 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Iconography note ── */}
      <section>
        <h2 className="font-serif font-semibold text-ink mb-4 pb-3" style={{ fontSize: 22, borderBottom: '1px solid var(--color-rule)' }}>
          Iconography
        </h2>
        <p className="text-dim text-sm leading-relaxed mb-5">
          CiteGuard uses Unicode symbols and typographic characters rather than an icon library,
          preserving the academic publishing aesthetic and avoiding decorative overhead.
        </p>
        <div
          className="bg-surface rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--color-rule)' }}
        >
          {[
            { char: '✓', name: 'Verified / check', usage: 'Status badge, completion state' },
            { char: '✕', name: 'Error / not found', usage: 'Retracted, upload error' },
            { char: '⚑', name: 'Flag', usage: 'Semantic mismatch, flagged citation' },
            { char: '◎', name: 'Open access ring', usage: 'OA badge, open-access indicator' },
            { char: '○', name: 'Pending circle', usage: 'Unverified, processing state' },
            { char: '↑', name: 'Upload arrow', usage: 'Upload dropzone idle state' },
            { char: '↓', name: 'Download arrow', usage: 'Export, download actions' },
            { char: '▾', name: 'Chevron down', usage: 'Expand/collapse row' },
            { char: '→', name: 'Right arrow', usage: 'Navigation, view-more links' },
          ].map((icon) => (
            <div
              key={icon.char}
              className="flex items-center gap-5 px-5 py-3"
              style={{ borderBottom: '1px solid var(--color-rule)' }}
            >
              <span
                className="font-sans text-ink flex-shrink-0"
                style={{ width: 28, fontSize: 20, lineHeight: 1 }}
                aria-hidden="true"
              >
                {icon.char}
              </span>
              <p className="font-mono text-ink text-xs flex-shrink-0" style={{ width: 140 }}>
                {icon.name}
              </p>
              <p className="text-dim text-xs">{icon.usage}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
