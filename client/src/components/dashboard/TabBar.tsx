import { Inbox, Radar, RefreshCw } from 'lucide-react'
import type { DashboardTab, Summary } from '../../types'

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
  const counts = {
    hunt: summary.prospectsToHunt,
    activate: summary.contactsToNurture,
    inbox: summary.repliesWaiting,
  }

  return (
    <div role="tablist" aria-label="Outbound engine queues" className="flex gap-6 border-t border-gray-100 px-6">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${tab.id}-tab`}
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 border-b-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isActive
                ? 'border-indigo-600 font-medium text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{tab.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${tab.badgeClassName}`}>
              {counts[tab.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
