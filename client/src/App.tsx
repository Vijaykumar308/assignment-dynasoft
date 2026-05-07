import { Navigate, Route, Routes } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { Dashboard } from './pages/Dashboard'
import { PlaceholderPage } from './pages/PlaceholderPage'

export function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<PlaceholderPage />} />
        <Route path="/knowledge-base" element={<PlaceholderPage />} />
        <Route path="/marketing-events" element={<PlaceholderPage />} />
        <Route path="/prospects/:prospectId" element={<PlaceholderPage />} />
        <Route path="/agents/:agentId/settings" element={<PlaceholderPage />} />
        <Route path="/profile" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  )
}
