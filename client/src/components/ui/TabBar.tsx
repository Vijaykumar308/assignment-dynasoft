import type { LucideIcon } from 'lucide-react'

export interface TabDef<T extends string> {
  id: T
  label: string
  count?: number
  icon?: LucideIcon
  badgeClassName?: string
  panelId?: string
}

interface TabBarProps<T extends string> {
  tabs: TabDef<T>[]
  activeTab: T
  onChange: (tab: T) => void
  ariaLabel?: string
}

export function TabBar<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = 'Tabs',
}: TabBarProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-6 overflow-x-auto border-t border-gray-100 px-6">
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
            aria-controls={tab.panelId ?? `${tab.id}-panel`}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] ${
              isActive
                ? 'border-indigo-600 font-medium text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium text-white ${
                  tab.badgeClassName ?? 'bg-indigo-600'
                }`}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
