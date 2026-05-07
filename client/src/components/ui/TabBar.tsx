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
    <div className="border-t border-gray-100 px-6 py-3">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm"
      >
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
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] ${
                isActive
                  ? 'border-indigo-100 bg-white font-medium text-indigo-600 shadow-sm'
                  : 'border-transparent text-gray-500 hover:bg-white hover:text-gray-700'
              }`}
            >
              {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : `${tab.badgeClassName ?? 'bg-indigo-600'} text-white`
                  }`}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
