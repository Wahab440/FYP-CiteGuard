import type { Screen } from '../types'

interface NavItem {
  id: Screen
  label: string
}

const sections: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'Core Flow',
    items: [
      { id: 'login', label: 'Login' },
      { id: 'upload', label: 'Upload' },
      { id: 'processing', label: 'Processing' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'citation-detail', label: 'Citation Detail' },
      { id: 'report', label: 'Report Preview' },
    ],
  },
  {
    title: 'Researcher',
    items: [{ id: 'batch', label: 'Batch View' }],
  },
  {
    title: 'Design System',
    items: [
      { id: 'empty-states', label: 'Empty States' },
      { id: 'style-guide', label: 'Style Guide' },
      { id: 'components', label: 'Components' },
    ],
  },
]

interface Props {
  current: Screen
  onNavigate: (screen: Screen) => void
}

export default function Nav({ current, onNavigate }: Props) {
  return (
    <nav
      className="flex-shrink-0 bg-surface flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{ width: 196, borderRight: '1px solid var(--color-rule)' }}
      aria-label="Main navigation"
    >
      {/* Logotype */}
      <div className="px-4 py-5" style={{ borderBottom: '1px solid var(--color-rule)' }}>
        <span className="font-serif font-bold text-ink tracking-tight" style={{ fontSize: 17 }}>
          CiteGuard
        </span>
        <p className="font-mono text-dim mt-0.5" style={{ fontSize: 10 }}>
          UI System Demo
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 py-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p
              className="px-4 pb-1 font-sans font-semibold text-dim uppercase tracking-widest"
              style={{ fontSize: 10 }}
            >
              {section.title}
            </p>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                  current === item.id
                    ? 'bg-teal-pale text-teal font-medium'
                    : 'text-dim hover:text-ink hover:bg-muted/60'
                }`}
                aria-current={current === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* User info */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid var(--color-rule)' }}>
        <p className="text-sm font-medium text-ink leading-tight">Dr. Sarah Chen</p>
        <p className="text-xs text-dim mt-0.5">Researcher &middot; MIT</p>
      </div>
    </nav>
  )
}
