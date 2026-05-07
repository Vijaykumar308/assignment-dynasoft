import type { ProspectSignal, SignalType } from '../../types'

interface SignalPillProps {
  signal?: ProspectSignal
  type?: SignalType
  label?: string
  timeAgo?: string
}

const signalClasses: Record<SignalType, string> = {
  funding: 'bg-purple-500',
  hiring: 'bg-blue-500',
  job_change: 'bg-pink-500',
  news: 'bg-amber-500',
}

export function formatSignalTime(daysAgo: number) {
  if (daysAgo === 0) {
    return '5 hrs ago'
  }

  return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
}

export function SignalPill({ signal, type, label, timeAgo }: SignalPillProps) {
  const resolvedType = signal?.type ?? type ?? 'news'
  const resolvedLabel = signal?.label ?? label ?? ''
  const resolvedTimeAgo = timeAgo ?? (signal ? formatSignalTime(signal.daysAgo) : '')

  return (
    <div className="flex items-start gap-2">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${signalClasses[resolvedType]}`} aria-hidden="true" />
      <span>
        <span className="block text-[13px] text-gray-700">{resolvedLabel}</span>
        <span className="block text-[11px] font-medium text-gray-400">{resolvedTimeAgo}</span>
      </span>
    </div>
  )
}
