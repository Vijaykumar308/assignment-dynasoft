import type { FilterState, ProspectStage, SignalType } from '../../types'

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
}

const stageOptions: ProspectStage[] = ['MQL', 'SQL', 'ICP']
const signalOptions: { value: SignalType; label: string }[] = [
  { value: 'funding', label: 'Funding' },
  { value: 'hiring', label: 'Hiring' },
  { value: 'job_change', label: 'Job Change' },
  { value: 'news', label: 'News' },
]

function toggleValue<T>(items: T[], value: T) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

export function FilterSheet({ open, onClose, filters, onChange, onReset }: FilterSheetProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-30 bg-gray-900/20" role="presentation">
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl" aria-label="Filters">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 active:scale-[0.98]"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-medium text-gray-900">Stage</legend>
            <div className="mt-3 flex gap-3">
              {stageOptions.map((stage) => (
                <label key={stage} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filters.stages.includes(stage)}
                    onChange={() => onChange({ ...filters, stages: toggleValue(filters.stages, stage) })}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-gray-900">Signal Type</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {signalOptions.map((signal) => (
                <label key={signal.value} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filters.signalTypes.includes(signal.value)}
                    onChange={() =>
                      onChange({ ...filters, signalTypes: toggleValue(filters.signalTypes, signal.value) })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
              onChange={(event) => onChange({ ...filters, goal: event.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block text-sm font-medium text-gray-900">
            Date Range
            <select
              value={filters.dateRange}
              onChange={(event) => onChange({ ...filters, dateRange: event.target.value as FilterState['dateRange'] })}
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
          onClick={onReset}
          className="mt-auto rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
        >
          Reset All
        </button>
      </aside>
    </div>
  )
}
