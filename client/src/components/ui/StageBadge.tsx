import type { ProspectStage } from '../../types'
import { Badge } from './Badge'

interface StageBadgeProps {
  stage: ProspectStage
}

export function StageBadge({ stage }: StageBadgeProps) {
  return <Badge variant={stage.toLowerCase() as Lowercase<ProspectStage>} label={stage} />
}
