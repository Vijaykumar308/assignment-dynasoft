import { Archive, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { prospects } from '../../data/prospects'
import type { Prospect } from '../../types'
import { Avatar } from '../ui/Avatar'
import { SignalPill } from '../ui/SignalPill'
import { StageBadge } from '../ui/StageBadge'

type SortKey = 'name' | 'stage' | 'signal'

interface HeaderCell {
  label: string
  sortKey?: SortKey
}

const headerCells: HeaderCell[] = [
  { label: 'Prospect', sortKey: 'name' },
  { label: 'Stage', sortKey: 'stage' },
  { label: 'Goal' },
  { label: 'Signal', sortKey: 'signal' },
  { label: 'Recommended Action' },
  { label: 'Actions' },
]

function sortProspects(items: Prospect[], sortKey: SortKey) {
  return [...items].sort((first, second) => {
    if (sortKey === 'signal') {
      return first.signal.daysAgo - second.signal.daysAgo
    }

    return first[sortKey].localeCompare(second[sortKey])
  })
}

export function HuntQueueTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('signal')
  const sortedProspects = useMemo(() => sortProspects(prospects, sortKey), [sortKey])
  const isAllSelected = selectedIds.length === prospects.length

  const toggleAll = () => {
    setSelectedIds(isAllSelected ? [] : prospects.map((prospect) => prospect.id))
  }

  const toggleRow = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    )
  }

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {selectedIds.length > 0 ? (
        <div className="flex items-center justify-between border-b border-gray-200 bg-indigo-50 px-4 py-3">
          <p className="text-sm font-medium text-indigo-700">{selectedIds.length} selected</p>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-sm font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Clear selection
          </button>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table role="table" className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  aria-label="Select all prospects"
                  checked={isAllSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {headerCells.map((cell) => {
                const sortableKey = cell.sortKey

                return (
                  <th
                    key={cell.label}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    {sortableKey ? (
                      <button
                        type="button"
                        onClick={() => setSortKey(sortableKey)}
                        className="inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {cell.label}
                        <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    ) : (
                      cell.label
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedProspects.map((prospect) => (
              <tr key={prospect.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${prospect.name}`}
                    checked={selectedIds.includes(prospect.id)}
                    onChange={() => toggleRow(prospect.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={prospect.name} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prospect.name}</p>
                      <p className="text-sm text-gray-500">{prospect.title}</p>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        {prospect.company}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StageBadge stage={prospect.stage} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{prospect.goal}</td>
                <td className="px-4 py-3">
                  <SignalPill signal={prospect.signal} />
                </td>
                <td className="max-w-xs px-4 py-3 text-sm text-gray-700">
                  <p className="line-clamp-2">{prospect.action}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      Review
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <MoreHorizontal className="h-4 w-4" aria-label="More actions" />
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <Archive className="h-4 w-4" aria-label="Archive prospect" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
