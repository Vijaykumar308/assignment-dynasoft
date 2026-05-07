import { Inbox, Radar, RefreshCw } from 'lucide-react'
import type { DashboardTab, Summary } from '../../types'
import { TabBar as UITabBar } from '../ui/TabBar'

interface TabBarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  summary: Summary
}

const tabs = [
  { id: 'hunt', label: 'Hunt', icon: Radar, badgeClassName: 'bg-indigo-600' },
  { id: 'activate', label: 'Activate', icon: RefreshCw, badgeClassName: 'bg-green-600' },
  { id: 'inbox', label: 'Inbox', icon: Inbox, badgeClassName: 'bg-amber-500' },
] as const

export function TabBar({ activeTab, onTabChange, summary }: TabBarProps) {
  return (
    <UITabBar
      ariaLabel="Outbound engine queues"
      activeTab={activeTab}
      onChange={onTabChange}
      tabs={tabs.map((tab) => ({
        ...tab,
        count:
          tab.id === 'hunt'
            ? summary.prospectsToHunt
            : tab.id === 'activate'
              ? summary.contactsToNurture
              : summary.repliesWaiting,
      }))}
    />
  )
}
