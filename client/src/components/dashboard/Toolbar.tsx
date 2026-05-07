import { Filter, Upload } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import type { DashboardView, ProspectFilters, ProspectStage, SignalType } from '../../types'
import { ProspectSearch } from './ProspectSearch'
import { ViewToggle } from './ViewToggle'

interface ToolbarProps {
  view: DashboardView
  onViewChange: (view: DashboardView) => void
  contactsCount: number
  accountsCount: number
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: ProspectFilters
  onFiltersChange: (filters: ProspectFilters) => void
}

const stageOptions: ProspectStage[] = ['MQL', 'SQL', 'ICP']
const signalOptions: { value: SignalType; label: string }[] = [
  { value: 'funding', label: 'Funding' },
  { value: 'hiring', label: 'Hiring' },
  { value: 'job_change', label: 'Job Change' },
  { value: 'news', label: 'News' },
]

const emptyFilters: ProspectFilters = {
  stages: [],
  signalTypes: [],
  goal: '',
  dateRange: '',
}

function toggleValue<T>(items: T[], value: T) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

function getActiveFilterCount(filters: ProspectFilters) {
  return (
    filters.stages.length +
    filters.signalTypes.length +
    (filters.goal ? 1 : 0) +
    (filters.dateRange ? 1 : 0)
  )
}

export function Toolbar({
  view,
  onViewChange,
  contactsCount,
  accountsCount,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
}: ToolbarProps) {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const activeFilterCount = getActiveFilterCount(filters)

  const updateFilters = (nextFilters: ProspectFilters) => {
    const params = new URLSearchParams(window.location.search)

    if (nextFilters.stages.length) params.set('stage', nextFilters.stages.join(','))
    else params.delete('stage')

    if (nextFilters.signalTypes.length) params.set('signal', nextFilters.signalTypes.join(','))
    else params.delete('signal')

    if (nextFilters.goal) params.set('goal', nextFilters.goal)
    else params.delete('goal')

    if (nextFilters.dateRange) params.set('dateRange', nextFilters.dateRange)
    else params.delete('dateRange')

    const nextQuery = params.toString()
    window.history.replaceState(null, '', nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname)
    onFiltersChange(nextFilters)
  }

  const handleUpload = (file: File) => {
    setUploadError('')
    setUploadProgress(0)

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadError('Only .csv files are accepted.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('CSV files must be 5MB or smaller.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const request = new XMLHttpRequest()
    request.open('POST', '/api/prospects/import')
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100))
      }
    }
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        queryClient.invalidateQueries({ queryKey: ['prospects'] })
        toast.success('Prospects imported')
        setIsUploadOpen(false)
        return
      }

      setUploadError(request.responseText || 'Upload failed. Check the CSV columns and required fields.')
    }
    request.onerror = () => setUploadError('Upload failed. Please try again.')
    request.send(formData)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <ViewToggle
        value={view}
        onChange={onViewChange}
        contactsCount={contactsCount}
        accountsCount={accountsCount}
      />

      <div className="flex flex-1 flex-col gap-3 sm:max-w-2xl sm:flex-row">
        <ProspectSearch value={searchQuery} onChange={onSearchChange} />

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Upload
        </button>
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-30 bg-gray-900/20" role="presentation">
          <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl" aria-label="Filters">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              <button type="button" onClick={() => setIsFilterOpen(false)} className="text-sm font-medium text-gray-600">
                Close
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <fieldset>
                <legend className="text-sm font-medium text-gray-900">Stage</legend>
                <div className="mt-3 flex gap-2">
                  {stageOptions.map((stage) => (
                    <label key={stage} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={filters.stages.includes(stage)}
                        onChange={() => updateFilters({ ...filters, stages: toggleValue(filters.stages, stage) })}
                      />
                      {stage}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-gray-900">Signal Type</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {signalOptions.map((signal) => (
                    <label key={signal.value} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={filters.signalTypes.includes(signal.value)}
                        onChange={() =>
                          updateFilters({ ...filters, signalTypes: toggleValue(filters.signalTypes, signal.value) })
                        }
                      />
                      {signal.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-gray-900">
                Goal
                <input
                  value={filters.goal}
                  onChange={(event) => updateFilters({ ...filters, goal: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="block text-sm font-medium text-gray-900">
                Date Range
                <select
                  value={filters.dateRange}
                  onChange={(event) =>
                    updateFilters({ ...filters, dateRange: event.target.value as ProspectFilters['dateRange'] })
                  }
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Any time</option>
                  <option value="7d">Last 7d</option>
                  <option value="30d">Last 30d</option>
                  <option value="90d">Last 90d</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={() => updateFilters(emptyFilters)}
              className="mt-auto rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset All
            </button>
          </aside>
        </div>
      ) : null}

      {isUploadOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/30 p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="upload-title" className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 id="upload-title" className="text-base font-semibold text-gray-900">
                Upload prospects
              </h2>
              <button type="button" onClick={() => setIsUploadOpen(false)} className="text-sm font-medium text-gray-600">
                Close
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files[0]
                if (file) handleUpload(file)
              }}
              onDragOver={(event) => event.preventDefault()}
              className="mt-5 flex min-h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center text-sm text-gray-600 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Drop a CSV here or browse files
              <span className="mt-2 text-xs text-gray-500">CSV only, up to 5MB</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) handleUpload(file)
              }}
            />

            <a href="/templates/prospects.csv" className="mt-4 inline-flex text-sm font-medium text-indigo-600">
              Download CSV template
            </a>
            {uploadProgress > 0 ? (
              <div className="mt-4 h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${uploadProgress}%` }} />
              </div>
            ) : null}
            {uploadError ? <p className="mt-4 text-sm font-medium text-red-600">{uploadError}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
