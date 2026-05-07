import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { SortState } from '../../types'
import { Skeleton } from './Skeleton'

export interface ColDef<T> {
  id: string
  header: string
  flexGrow?: number
  sortable?: boolean
  render: (row: T) => ReactNode
}

interface DataTableProps<T extends { id: string }> {
  columns: ColDef<T>[]
  data: T[]
  isLoading?: boolean
  emptyState: ReactNode
  onSort?: (sortState: SortState) => void
  sortState?: SortState
  selectedIds: string[]
  onSelectChange: (selectedIds: string[]) => void
  bulkToolbar?: ReactNode
  getRowLabel: (row: T) => string
}

const rowHeight = 72
const pageSize = 50

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  emptyState,
  onSort,
  sortState,
  selectedIds,
  onSelectChange,
  bulkToolbar,
  getRowLabel,
}: DataTableProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [visibleLimit, setVisibleLimit] = useState(pageSize)
  const shouldVirtualize = data.length > 100
  const totalFlex = columns.reduce((sum, column) => sum + (column.flexGrow ?? 1), 1)
  const visibleData = data.slice(0, visibleLimit)
  const selectedVisibleIds = visibleData.map((row) => row.id)
  const isAllSelected = selectedVisibleIds.length > 0 && selectedVisibleIds.every((id) => selectedIds.includes(id))

  const virtualRows = useMemo(() => {
    if (!shouldVirtualize) {
      return { rows: visibleData, topSpacer: 0, bottomSpacer: 0 }
    }

    const viewportHeight = scrollRef.current?.clientHeight ?? 520
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 4)
    const endIndex = Math.min(visibleData.length, Math.ceil((scrollTop + viewportHeight) / rowHeight) + 4)

    return {
      rows: visibleData.slice(startIndex, endIndex),
      topSpacer: startIndex * rowHeight,
      bottomSpacer: Math.max(0, (visibleData.length - endIndex) * rowHeight),
    }
  }, [scrollTop, shouldVirtualize, visibleData])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) {
      return
    }

    const onScroll = () => {
      setScrollTop(element.scrollTop)
      const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight
      if (distanceFromBottom < 200) {
        setVisibleLimit((current) => Math.min(data.length, current + pageSize))
      }
    }

    element.addEventListener('scroll', onScroll)
    return () => element.removeEventListener('scroll', onScroll)
  }, [data.length])

  useEffect(() => {
    setVisibleLimit(pageSize)
  }, [data])

  const toggleAll = () => {
    if (isAllSelected) {
      onSelectChange(selectedIds.filter((id) => !selectedVisibleIds.includes(id)))
      return
    }

    onSelectChange([...new Set([...selectedIds, ...selectedVisibleIds])])
  }

  const toggleRow = (id: string) => {
    onSelectChange(selectedIds.includes(id) ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id])
  }

  const sortIcon = (columnId: string) => {
    if (sortState?.column !== columnId) {
      return <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
    }

    return sortState.direction === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
    )
  }

  const handleSort = (columnId: string) => {
    const direction = sortState?.column === columnId && sortState.direction === 'asc' ? 'desc' : 'asc'
    onSort?.({ column: columnId, direction })
  }

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {bulkToolbar}
      <div ref={scrollRef} className="max-h-[calc(100vh-260px)] min-h-72 overflow-auto">
        <table role="table" className="min-w-[960px] w-full table-fixed divide-y divide-gray-200">
          <colgroup>
            <col style={{ width: '4%' }} />
            {columns.map((column) => (
              <col key={column.id} style={{ width: `${((column.flexGrow ?? 1) / totalFlex) * 96}%` }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-[1] bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={isAllSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-gray-500"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.id)}
                      className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
                    >
                      {column.header}
                      {sortIcon(column.id)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <Skeleton width="16px" height="16px" rounded="rounded" />
                  </td>
                  {columns.map((column) => (
                    <td key={column.id} className="px-4 py-3">
                      <Skeleton width={column.id === 'recommendedAction' ? '88%' : '64%'} height="14px" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12">
                  {emptyState}
                </td>
              </tr>
            ) : (
              <>
                {virtualRows.topSpacer ? (
                  <tr aria-hidden="true">
                    <td colSpan={columns.length + 1} style={{ height: virtualRows.topSpacer }} />
                  </tr>
                ) : null}
                {virtualRows.rows.map((row) => (
                  <tr key={row.id} className="transition-colors duration-150 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${getRowLabel(row)}`}
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    {columns.map((column) => (
                      <td key={column.id} className="px-4 py-3 text-[13px] font-normal text-gray-700">
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
                {virtualRows.bottomSpacer ? (
                  <tr aria-hidden="true">
                    <td colSpan={columns.length + 1} style={{ height: virtualRows.bottomSpacer }} />
                  </tr>
                ) : null}
              </>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && visibleLimit < data.length ? (
        <div className="border-t border-gray-200 bg-white px-4 py-3 text-center">
          <button
            type="button"
            onClick={() => setVisibleLimit((current) => Math.min(data.length, current + pageSize))}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
          >
            Load more
          </button>
        </div>
      ) : null}
    </section>
  )
}
