import type { User } from '../../types'
import { useSummary } from '../../hooks/useSummary'
import { useDashboardStore } from '../../store/dashboardStore'
import { GreetingBar } from '../dashboard/GreetingBar'
import { TabBar } from '../dashboard/TabBar'

interface TopBarProps {
  user: User
}

export function TopBar({ user }: TopBarProps) {
  const activeTab = useDashboardStore((state) => state.activeTab)
  const setActiveTab = useDashboardStore((state) => state.setActiveTab)
  const { data: summary } = useSummary()

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <GreetingBar user={user} />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} summary={summary} />
    </header>
  )
}
