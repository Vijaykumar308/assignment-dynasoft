import type { ProspectStage } from '../../types'

type BadgeVariant = Lowercase<ProspectStage> | 'info' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  variant: BadgeVariant
  label: string
}

const badgeClasses: Record<BadgeVariant, string> = {
  mql: 'bg-blue-100 text-blue-700',
  sql: 'bg-green-100 text-green-700',
  icp: 'bg-amber-100 text-amber-700',
  info: 'bg-indigo-100 text-indigo-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeClasses[variant]}`}>
      {label}
    </span>
  )
}
