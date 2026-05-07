import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types'
import type { DashboardTab } from '../../types'
import { summary as fallbackSummary } from '../../data/prospects'
import { fetchSummary } from '../../data/summary'
import { GreetingBar } from '../dashboard/GreetingBar'
import { TabBar } from '../dashboard/TabBar'

interface TopBarProps {
  user: User
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export function TopBar({ user, activeTab, onTabChange }: TopBarProps) {
  const { data: summary = fallbackSummary } = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    refetchInterval: 30_000,
  })

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <GreetingBar user={user} />
      <TabBar activeTab={activeTab} onTabChange={onTabChange} summary={summary} />
    </header>
  )
}
