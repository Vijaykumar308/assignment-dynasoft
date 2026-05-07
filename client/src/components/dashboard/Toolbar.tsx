import { Filter, Upload } from 'lucide-react'
import { useState } from 'react'
import { emptyFilters, useDashboardStore } from '../../store/dashboardStore'
import type { DashboardView, FilterState } from '../../types'
import { FilterSheet } from '../ui/FilterSheet'
import { SearchInput } from '../ui/SearchInput'
import { UploadModal } from '../ui/UploadModal'
import { ViewToggle } from '../ui/ViewToggle'

interface ToolbarProps {
  contactsCount: number
  accountsCount: number
  isSearching?: boolean
}

function getActiveFilterCount(filters: FilterState) {
  return (
    filters.stages.length +
    filters.signalTypes.length +
    (filters.goal ? 1 : 0) +
    (filters.dateRange ? 1 : 0)
  )
}

function syncFiltersToUrl(filters: FilterState) {
  const params = new URLSearchParams(window.location.search)

  if (filters.stages.length) params.set('stage', filters.stages.join(','))
  else params.delete('stage')

  if (filters.signalTypes.length) params.set('signal', filters.signalTypes.join(','))
  else params.delete('signal')

  if (filters.goal) params.set('goal', filters.goal)
  else params.delete('goal')

  if (filters.dateRange) params.set('dateRange', filters.dateRange)
  else params.delete('dateRange')

  const nextQuery = params.toString()
  window.history.replaceState(null, '', nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname)
}

export function Toolbar({ contactsCount, accountsCount, isSearching = false }: ToolbarProps) {
  const activeView = useDashboardStore((state) => state.activeView)
  const searchQuery = useDashboardStore((state) => state.searchQuery)
  const filterState = useDashboardStore((state) => state.filterState)
  const setActiveView = useDashboardStore((state) => state.setActiveView)
  const setSearchQuery = useDashboardStore((state) => state.setSearchQuery)
  const setFilterState = useDashboardStore((state) => state.setFilterState)
  const resetFilters = useDashboardStore((state) => state.resetFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const activeFilterCount = getActiveFilterCount(filterState)

  const updateFilters = (filters: FilterState) => {
    syncFiltersToUrl(filters)
    setFilterState(filters)
  }

  const clearFilters = () => {
    syncFiltersToUrl(emptyFilters)
    resetFilters()
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <ViewToggle<DashboardView>
        ariaLabel="View toggle"
        value={activeView}
        onChange={setActiveView}
        options={[
          { value: 'contacts', label: `Contacts (${contactsCount})` },
          { value: 'accounts', label: `Accounts (${accountsCount})` },
        ]}
      />

      <div className="flex flex-1 flex-col gap-3 sm:max-w-2xl sm:flex-row">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search by prospect, signal, account..."
          isLoading={isSearching}
        />

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Upload
        </button>
      </div>

      <FilterSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filterState}
        onChange={updateFilters}
        onReset={clearFilters}
      />
      <UploadModal open={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  )
}
