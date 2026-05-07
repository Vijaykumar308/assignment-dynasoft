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
      className="relative inline-grid overflow-hidden rounded-lg border border-gray-200 bg-white p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-1 top-1 rounded-md bg-indigo-600 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: `calc(0.25rem + (${Math.max(activeIndex, 0)} * ((100% - 0.5rem) / ${options.length})))`,
          width: `calc((100% - 0.5rem) / ${options.length})`,
        }}
      />
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
            className={`relative z-[1] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] ${
              isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
