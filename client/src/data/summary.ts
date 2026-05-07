import { summary as fallbackSummary } from './prospects'
import type { Summary } from '../types'

export async function fetchSummary(): Promise<Summary> {
  try {
    const response = await fetch('/api/summary', {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
      return fallbackSummary
    }

    return response.json()
  } catch {
    return fallbackSummary
  }
}
