import { create } from 'zustand'
import type { DashboardTab, DashboardView, FilterState, SortState } from '../types'

const emptyFilters: FilterState = {
  stages: [],
  signalTypes: [],
  goal: '',
  dateRange: '',
}

interface DashboardStore {
  activeTab: DashboardTab
  activeView: DashboardView
  selectedProspectIds: string[]
  filterState: FilterState
  searchQuery: string
  sortState: SortState
  setActiveTab: (activeTab: DashboardTab) => void
  setActiveView: (activeView: DashboardView) => void
  setSelectedProspectIds: (selectedProspectIds: string[]) => void
  toggleSelectedProspectId: (id: string) => void
  clearSelectedProspects: () => void
  setFilterState: (filterState: FilterState) => void
  resetFilters: () => void
  setSearchQuery: (searchQuery: string) => void
  setSortState: (sortState: SortState) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeTab: 'hunt',
  activeView: 'contacts',
  selectedProspectIds: [],
  filterState: emptyFilters,
  searchQuery: '',
  sortState: { column: 'signal', direction: 'asc' },
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveView: (activeView) => set({ activeView, selectedProspectIds: [] }),
  setSelectedProspectIds: (selectedProspectIds) => set({ selectedProspectIds }),
  toggleSelectedProspectId: (id) =>
    set((state) => ({
      selectedProspectIds: state.selectedProspectIds.includes(id)
        ? state.selectedProspectIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedProspectIds, id],
    })),
  clearSelectedProspects: () => set({ selectedProspectIds: [] }),
  setFilterState: (filterState) => set({ filterState, selectedProspectIds: [] }),
  resetFilters: () => set({ filterState: emptyFilters, selectedProspectIds: [] }),
  setSearchQuery: (searchQuery) => set({ searchQuery, selectedProspectIds: [] }),
  setSortState: (sortState) => set({ sortState }),
}))

export { emptyFilters }
