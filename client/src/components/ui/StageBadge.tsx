import type { ProspectStage } from '../../types'

interface StageBadgeProps {
  stage: ProspectStage
}

const stageClasses: Record<ProspectStage, string> = {
  MQL: 'bg-blue-100 text-blue-700',
  SQL: 'bg-green-100 text-green-700',
  ICP: 'bg-amber-100 text-amber-700',
}

export function StageBadge({ stage }: StageBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${stageClasses[stage]}`}>
      {stage}
    </span>
  )
}
