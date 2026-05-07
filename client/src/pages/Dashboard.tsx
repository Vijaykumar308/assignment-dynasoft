import { useEffect, useMemo } from 'react'
import { HuntQueueTable } from '../components/dashboard/HuntQueueTable'
import { Toolbar } from '../components/dashboard/Toolbar'
import { accounts as fallbackAccounts, prospects as fallbackProspects } from '../data/prospects'
import { useProspects } from '../hooks/useProspects'
import { emptyFilters, useDashboardStore } from '../store/dashboardStore'
import type { FilterState, Prospect, ProspectStage, SignalType } from '../types'

function readFiltersFromUrl(): FilterState {
  const params = new URLSearchParams(window.location.search)

  return {
    stages: (params.get('stage')?.split(',').filter(Boolean) ?? []) as ProspectStage[],
    signalTypes: (params.get('signal')?.split(',').filter(Boolean) ?? []) as SignalType[],
    goal: params.get('goal') ?? '',
    dateRange: (params.get('dateRange') as FilterState['dateRange']) ?? '',
  }
}

function clearFilterUrl() {
  window.history.replaceState(null, '', window.location.pathname)
}

function ActivatePanel() {
  return (
    <section
      id="activate-panel"
      role="tabpanel"
      aria-labelledby="activate-tab"
      className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center"
    >
      <h2 className="text-[15px] font-medium text-gray-900">Nurture sequences are coming soon</h2>
      <p className="mt-2 text-sm text-gray-600">
        Existing contacts will appear here with recommended follow-up sequences.
      </p>
    </section>
  )
}

function InboxPanel({ items }: { items: Prospect[] }) {
  return (
    <section id="inbox-panel" role="tabpanel" aria-labelledby="inbox-tab" className="space-y-3">
      {items.map((prospect) => (
        <article key={prospect.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-medium text-gray-900">{prospect.name}</h2>
              <p className="text-sm text-gray-500">{prospect.company}</p>
              <p className="mt-3 text-sm text-gray-700">{prospect.replyPreview}</p>
            </div>
            <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]">
              Open
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}

export function Dashboard() {
  const activeTab = useDashboardStore((state) => state.activeTab)
  const activeView = useDashboardStore((state) => state.activeView)
  const filterState = useDashboardStore((state) => state.filterState)
  const searchQuery = useDashboardStore((state) => state.searchQuery)
  const sortState = useDashboardStore((state) => state.sortState)
  const setFilterState = useDashboardStore((state) => state.setFilterState)
  const resetFilters = useDashboardStore((state) => state.resetFilters)
  const { data, isLoading, isFetching } = useProspects(filterState, activeView, searchQuery, sortState)
  const inboxItems = useMemo(() => fallbackProspects.filter((prospect) => prospect.replied), [])

  useEffect(() => {
    setFilterState(readFiltersFromUrl())
  }, [setFilterState])

  const clearFilters = () => {
    clearFilterUrl()
    setFilterState(emptyFilters)
    resetFilters()
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {activeTab === 'hunt' ? (
        <section id="hunt-panel" role="tabpanel" aria-labelledby="hunt-tab" className="space-y-4">
          <Toolbar
            contactsCount={fallbackProspects.length}
            accountsCount={fallbackAccounts.length}
            isSearching={isFetching && !isLoading}
          />
          <HuntQueueTable
            view={activeView}
            prospects={data?.prospects ?? []}
            accounts={data?.accounts ?? []}
            isLoading={isLoading}
            onClearFilters={clearFilters}
          />
        </section>
      ) : null}
      {activeTab === 'activate' ? <ActivatePanel /> : null}
      {activeTab === 'inbox' ? <InboxPanel items={inboxItems} /> : null}
    </div>
  )
}
