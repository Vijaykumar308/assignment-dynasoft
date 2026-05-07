import { Filter, Search, Upload } from 'lucide-react'

export function Toolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1" aria-label="View toggle">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Contacts
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Accounts
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:max-w-2xl sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search prospects</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search prospects or companies"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Upload
        </button>
      </div>
    </div>
  )
}
