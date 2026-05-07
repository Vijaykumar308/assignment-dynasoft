import { useQuery } from '@tanstack/react-query'
import { fetchSummary } from '../data/summary'
import { summary as fallbackSummary } from '../data/prospects'

export function useSummary() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    refetchInterval: 30_000,
    initialData: fallbackSummary,
  })
}
