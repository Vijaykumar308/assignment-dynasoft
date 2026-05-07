import { useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { HuntQueueTable } from '../components/dashboard/HuntQueueTable'
import { Toolbar } from '../components/dashboard/Toolbar'
import { accounts, prospects } from '../data/prospects'
import type { DashboardTab, DashboardView, Prospect, ProspectFilters, ProspectStage, SignalType } from '../types'

interface DashboardOutletContext {
  activeTab: DashboardTab
}

const emptyFilters: ProspectFilters = {
  stages: [],
  signalTypes: [],
  goal: '',
  dateRange: '',
}

function readFiltersFromUrl(): ProspectFilters {
  const params = new URLSearchParams(window.location.search)

  return {
    stages: (params.get('stage')?.split(',').filter(Boolean) ?? []) as ProspectStage[],
    signalTypes: (params.get('signal')?.split(',').filter(Boolean) ?? []) as SignalType[],
    goal: params.get('goal') ?? '',
    dateRange: (params.get('dateRange') as ProspectFilters['dateRange']) ?? '',
  }
}

function matchesSearch(prospect: Prospect, query: string) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return [prospect.name, prospect.company, prospect.signal.label, prospect.stage]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery)
}

function matchesFilters(prospect: Prospect, filters: ProspectFilters) {
  const stageMatches = !filters.stages.length || filters.stages.includes(prospect.stage)
  const signalMatches = !filters.signalTypes.length || filters.signalTypes.includes(prospect.signal.type)
  const goalMatches = !filters.goal || prospect.goal.toLowerCase().includes(filters.goal.toLowerCase())

  return stageMatches && signalMatches && goalMatches
}

function ActivatePanel() {
  return (
    <section
      id="activate-panel"
      role="tabpanel"
      aria-labelledby="activate-tab"
      className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center"
    >
      <h2 className="text-base font-semibold text-gray-900">Nurture sequences are coming soon</h2>
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
        <article key={prospect.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{prospect.name}</h2>
              <p className="text-sm text-gray-500">{prospect.company}</p>
              <p className="mt-3 text-sm text-gray-700">{prospect.replyPreview}</p>
            </div>
            <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Open
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}

export function Dashboard() {
  const { activeTab } = useOutletContext<DashboardOutletContext>()
  const [view, setView] = useState<DashboardView>('contacts')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ProspectFilters>(() => readFiltersFromUrl() ?? emptyFilters)
  const handleSearchChange = useCallback((query: string) => setSearchQuery(query), [])

  const filteredProspects = useMemo(
    () => prospects.filter((prospect) => matchesSearch(prospect, searchQuery) && matchesFilters(prospect, filters)),
    [filters, searchQuery],
  )

  const filteredAccounts = useMemo(() => {
    const matchedCompanyNames = new Set(filteredProspects.map((prospect) => prospect.company))

    return accounts.filter((account) => matchedCompanyNames.has(account.companyName))
  }, [filteredProspects])

  const inboxItems = useMemo(() => prospects.filter((prospect) => prospect.replied), [])

  return (
    <div className="space-y-4 p-6">
      {activeTab === 'hunt' ? (
        <section id="hunt-panel" role="tabpanel" aria-labelledby="hunt-tab" className="space-y-4">
          <Toolbar
            view={view}
            onViewChange={setView}
            contactsCount={prospects.length}
            accountsCount={accounts.length}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFiltersChange={setFilters}
          />
          <HuntQueueTable view={view} prospects={filteredProspects} accounts={filteredAccounts} />
        </section>
      ) : null}
      {activeTab === 'activate' ? <ActivatePanel /> : null}
      {activeTab === 'inbox' ? <InboxPanel items={inboxItems} /> : null}
    </div>
  )
}
