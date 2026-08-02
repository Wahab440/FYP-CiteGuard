import { useState } from 'react'
import type { Screen } from './types'
import Nav from './components/Nav'
import LoginScreen from './screens/LoginScreen'
import UploadScreen from './screens/UploadScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import DashboardScreen from './screens/DashboardScreen'
import CitationDetailScreen from './screens/CitationDetailScreen'
import ReportScreen from './screens/ReportScreen'
import BatchScreen from './screens/BatchScreen'
import EmptyStatesScreen from './screens/EmptyStatesScreen'
import StyleGuideScreen from './screens/StyleGuideScreen'
import ComponentsScreen from './screens/ComponentsScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-canvas)' }}>
      {screen !== 'login' && <Nav current={screen} onNavigate={setScreen} />}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {screen === 'login' && <LoginScreen onNavigate={setScreen} />}
        {screen === 'upload' && <UploadScreen onNavigate={setScreen} />}
        {screen === 'processing' && <ProcessingScreen onNavigate={setScreen} />}
        {screen === 'dashboard' && <DashboardScreen onNavigate={setScreen} />}
        {screen === 'citation-detail' && <CitationDetailScreen onNavigate={setScreen} />}
        {screen === 'report' && <ReportScreen onNavigate={setScreen} />}
        {screen === 'batch' && <BatchScreen onNavigate={setScreen} />}
        {screen === 'empty-states' && <EmptyStatesScreen onNavigate={setScreen} />}
        {screen === 'style-guide' && <StyleGuideScreen onNavigate={setScreen} />}
        {screen === 'components' && <ComponentsScreen onNavigate={setScreen} />}
      </main>
    </div>
  )
}
