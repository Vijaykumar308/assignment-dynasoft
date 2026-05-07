import type { KeyboardEvent } from 'react'

export interface ToggleOption<T extends string> {
  value: T
  label: string
}

interface ViewToggleProps<T extends string> {
  options: ToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
}

export function ViewToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = 'View toggle',
}: ViewToggleProps<T>) {
  const activeIndex = options.findIndex((option) => option.value === value)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return
    }

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (activeIndex + direction + options.length) % options.length
    onChange(options[nextIndex].value)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
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
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] ${
              isActive ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:text-gray-900'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
