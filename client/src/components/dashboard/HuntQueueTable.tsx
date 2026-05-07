import { Archive, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '../../store/dashboardStore'
import type { Account, DashboardView, Prospect } from '../../types'
import { Avatar } from '../ui/Avatar'
import type { ColDef } from '../ui/DataTable'
import { DataTable } from '../ui/DataTable'
import { SignalPill } from '../ui/SignalPill'
import { StageBadge } from '../ui/StageBadge'
import { useToast } from '../ui/Toast'

interface HuntQueueTableProps {
  view: DashboardView
  prospects: Prospect[]
  accounts: Account[]
  isLoading?: boolean
  onClearFilters: () => void
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50">
        <div className="grid grid-cols-2 gap-1">
          <span className="h-4 w-4 rounded bg-indigo-100" />
          <span className="h-4 w-4 rounded bg-gray-200" />
          <span className="h-4 w-4 rounded bg-gray-200" />
          <span className="h-4 w-4 rounded bg-amber-100" />
        </div>
      </div>
      <h2 className="mt-4 text-[15px] font-medium text-gray-900">No prospects match your filters</h2>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-3 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
      >
        Clear Filters
      </button>
    </div>
  )
}

export function HuntQueueTable({ view, prospects, accounts, isLoading = false, onClearFilters }: HuntQueueTableProps) {
  const navigate = useNavigate()
  const toast = useToast()
  const selectedIds = useDashboardStore((state) => state.selectedProspectIds)
  const setSelectedIds = useDashboardStore((state) => state.setSelectedProspectIds)
  const clearSelectedProspects = useDashboardStore((state) => state.clearSelectedProspects)
  const sortState = useDashboardStore((state) => state.sortState)
  const setSortState = useDashboardStore((state) => state.setSortState)

  const bulkToolbar = selectedIds.length ? (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-indigo-50 px-4 py-3">
      <p className="text-sm font-medium text-indigo-700">{selectedIds.length} selected</p>
      <div className="flex flex-wrap gap-2">
        {['Apply Stage', 'Add to Sequence', 'Archive Selected', 'Export'].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              toast.success(`${label} queued`, { duration: 4000 })
              if (label === 'Archive Selected') clearSelectedProspects()
            }}
            className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-medium text-indigo-700 transition-colors duration-150 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  ) : null

  const contactColumns: ColDef<Prospect>[] = [
    {
      id: 'name',
      header: 'Prospect',
      flexGrow: 2.4,
      sortable: true,
      render: (prospect) => (
        <div className="flex items-center gap-3">
          <Avatar name={prospect.name} />
          <div>
            <p className="text-[13px] font-medium text-gray-900">{prospect.name}</p>
            <p className="text-[13px] text-gray-600">{prospect.title}</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              {prospect.company}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'stage',
      header: 'Stage',
      flexGrow: 0.8,
      sortable: true,
      render: (prospect) => <StageBadge stage={prospect.stage} />,
    },
    {
      id: 'goal',
      header: 'Goal',
      flexGrow: 1.2,
      render: (prospect) => prospect.goal,
    },
    {
      id: 'signal',
      header: 'Signal',
      flexGrow: 1.5,
      sortable: true,
      render: (prospect) => <SignalPill signal={prospect.signal} />,
    },
    {
      id: 'recommendedAction',
      header: 'Recommended Action',
      flexGrow: 1.8,
      render: (prospect) => <p className="line-clamp-2">{prospect.action}</p>,
    },
    {
      id: 'actions',
      header: 'Actions',
      flexGrow: 1.2,
      render: (prospect) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/prospects/${prospect.id}`)}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
          >
            Review
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
          >
            <MoreHorizontal className="h-4 w-4" aria-label="More actions" />
          </button>
          <button
            type="button"
            onClick={() => toast.success('Prospect archived', { duration: 4000 })}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
          >
            <Archive className="h-4 w-4" aria-label="Archive prospect" />
          </button>
        </div>
      ),
    },
  ]

  const accountColumns: ColDef<Account>[] = [
    { id: 'companyName', header: 'Company Name', flexGrow: 1.6, render: (account) => account.companyName },
    { id: 'domain', header: 'Domain', flexGrow: 1.2, render: (account) => account.domain },
    { id: 'size', header: 'Size', flexGrow: 1, render: (account) => account.size },
    { id: 'industry', header: 'Industry', flexGrow: 1.3, render: (account) => account.industry },
    {
      id: 'signals',
      header: 'Signals',
      flexGrow: 1.6,
      render: (account) => (
        <div className="flex flex-wrap gap-2">
          {account.signals.map((signal) => (
            <SignalPill key={`${account.id}-${signal.label}`} signal={signal} />
          ))}
        </div>
      ),
    },
    {
      id: 'recommendedAction',
      header: 'Recommended Action',
      flexGrow: 1.7,
      render: (account) => <p className="line-clamp-2">{account.recommendedAction}</p>,
    },
  ]

  if (view === 'accounts') {
    return (
      <DataTable
        columns={accountColumns}
        data={accounts}
        isLoading={isLoading}
        emptyState={<EmptyState onClearFilters={onClearFilters} />}
        selectedIds={selectedIds}
        onSelectChange={setSelectedIds}
        bulkToolbar={bulkToolbar}
        getRowLabel={(account) => account.companyName}
      />
    )
  }

  return (
    <DataTable
      columns={contactColumns}
      data={prospects}
      isLoading={isLoading}
      emptyState={<EmptyState onClearFilters={onClearFilters} />}
      selectedIds={selectedIds}
      onSelectChange={setSelectedIds}
      bulkToolbar={bulkToolbar}
      sortState={sortState}
      onSort={setSortState}
      getRowLabel={(prospect) => prospect.name}
    />
  )
}
