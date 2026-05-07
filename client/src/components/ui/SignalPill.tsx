import type { ProspectSignal, SignalType } from '../../types'

interface SignalPillProps {
  signal: ProspectSignal
}

const signalClasses: Record<SignalType, string> = {
  funding: 'bg-purple-500',
  hiring: 'bg-blue-500',
  job_change: 'bg-pink-500',
  news: 'bg-amber-500',
}

function formatDaysAgo(daysAgo: number) {
  if (daysAgo === 0) {
    return 'Today'
  }

  return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
}

export function SignalPill({ signal }: SignalPillProps) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${signalClasses[signal.type]}`} aria-hidden="true" />
      <span>
        <span className="block text-sm text-gray-700">{signal.label}</span>
        <span className="block text-xs text-gray-400">{formatDaysAgo(signal.daysAgo)}</span>
      </span>
    </div>
  )
}
