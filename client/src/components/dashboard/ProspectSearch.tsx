import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ProspectSearchProps {
  value: string
  onChange: (query: string) => void
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay)

    return () => window.clearTimeout(timeoutId)
  }, [delay, value])

  return debouncedValue
}

export function ProspectSearch({ value, onChange }: ProspectSearchProps) {
  const [draft, setDraft] = useState(value)
  const debouncedQuery = useDebounce(draft, 300)

  useEffect(() => {
    onChange(debouncedQuery)
  }, [debouncedQuery, onChange])

  return (
    <label className="relative flex-1">
      <span className="sr-only">Search prospects</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        aria-label="Search prospects"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search by prospect, signal, account..."
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      />
      {draft ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setDraft('')}
          className="absolute right-2 top-1/2 rounded-md p-1 text-gray-400 -translate-y-1/2 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </label>
  )
}
