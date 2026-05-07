const tabs = [
  { label: 'Hunt', count: 12 },
  { label: 'Activate', count: 8 },
  { label: 'Inbox', count: 4 },
]

export function TabBar() {
  return (
    <div role="tablist" aria-label="Outbound engine queues" className="flex gap-6 border-t border-gray-100 px-6">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={index === 0}
          className={`border-b-2 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            index === 0
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          {tab.label} {tab.count}
        </button>
      ))}
    </div>
  )
}
