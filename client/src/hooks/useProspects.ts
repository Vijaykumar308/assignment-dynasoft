import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accounts as fallbackAccounts, prospects as fallbackProspects } from '../data/prospects'
import type { Account, DashboardView, FilterState, Prospect, SortState } from '../types'

interface ProspectsResponse {
  prospects: Prospect[]
  accounts: Account[]
}

function filterProspects(items: Prospect[], filters: FilterState, searchQuery: string) {
  const query = searchQuery.trim().toLowerCase()

  return items.filter((prospect) => {
    const matchesSearch =
      !query ||
      [prospect.name, prospect.company, prospect.signal.label, prospect.stage]
        .join(' ')
        .toLowerCase()
        .includes(query)
    const matchesStage = !filters.stages.length || filters.stages.includes(prospect.stage)
    const matchesSignal = !filters.signalTypes.length || filters.signalTypes.includes(prospect.signal.type)
    const matchesGoal = !filters.goal || prospect.goal.toLowerCase().includes(filters.goal.toLowerCase())

    return matchesSearch && matchesStage && matchesSignal && matchesGoal
  })
}

function sortProspects(items: Prospect[], sortState: SortState) {
  return [...items].sort((first, second) => {
    const modifier = sortState.direction === 'asc' ? 1 : -1

    if (sortState.column === 'signal') {
      return (first.signal.daysAgo - second.signal.daysAgo) * modifier
    }

    if (sortState.column === 'stage') {
      return first.stage.localeCompare(second.stage) * modifier
    }

    return first.name.localeCompare(second.name) * modifier
  })
}

async function fetchProspects(filters: FilterState, view: DashboardView): Promise<ProspectsResponse> {
  const params = new URLSearchParams()
  if (filters.stages.length) params.set('stage', filters.stages.join(','))
  if (filters.signalTypes.length) params.set('signal', filters.signalTypes.join(','))
  if (filters.goal) params.set('goal', filters.goal)
  if (filters.dateRange) params.set('dateRange', filters.dateRange)
  params.set('view', view)

  try {
    const response = await fetch(`/api/prospects?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
      return { prospects: fallbackProspects, accounts: fallbackAccounts }
    }

    return response.json()
  } catch {
    return { prospects: fallbackProspects, accounts: fallbackAccounts }
  }
}

export function useProspects(filters: FilterState, view: DashboardView, searchQuery: string, sortState: SortState) {
  return useQuery({
    queryKey: ['prospects', filters, view],
    queryFn: () => fetchProspects(filters, view),
    staleTime: 60_000,
    gcTime: 300_000,
    select: (data) => {
      const prospects = sortProspects(filterProspects(data.prospects, filters, searchQuery), sortState)
      const companyNames = new Set(prospects.map((prospect) => prospect.company))
      const accounts = data.accounts.filter((account) => companyNames.has(account.companyName))

      return { prospects, accounts }
    },
  })
}

export function useImportProspects() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/prospects/import', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error((await response.text()) || 'Upload failed. Check the CSV columns and required fields.')
      }

      return response.json().catch(() => ({}))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] })
    },
  })
}

export function useUpdateProspectStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, stage }: Pick<Prospect, 'id' | 'stage'>) => {
      const response = await fetch(`/api/prospects/${id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage }),
      })

      if (!response.ok) {
        throw new Error('Could not update prospect stage.')
      }

      return response.json().catch(() => ({}))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
  })
}
