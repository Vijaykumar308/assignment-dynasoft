import type { KeyboardEvent } from 'react'
import type { DashboardView } from '../../types'

interface ViewToggleProps {
  value: DashboardView
  onChange: (view: DashboardView) => void
  contactsCount: number
  accountsCount: number
}

const options = [
  { value: 'contacts', label: 'Contacts' },
  { value: 'accounts', label: 'Accounts' },
] as const

export function ViewToggle({ value, onChange, contactsCount, accountsCount }: ViewToggleProps) {
  const counts = {
    contacts: contactsCount,
    accounts: accountsCount,
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return
    }

    event.preventDefault()
    onChange(value === 'contacts' ? 'accounts' : 'contacts')
  }

  return (
    <div
      role="radiogroup"
      aria-label="View toggle"
      onKeyDown={handleKeyDown}
      className="inline-flex rounded-lg border border-gray-200 bg-white p-1"
    >
      {options.map((option) => {
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isActive ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:text-gray-900'
            }`}
          >
            {option.label} ({counts[option.value]})
          </button>
        )
      })}
    </div>
  )
}
