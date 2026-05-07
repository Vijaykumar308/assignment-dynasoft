import type { LucideIcon } from 'lucide-react'

export interface User {
  id: string
  name: string
  workspace: string
  role: string
  status: 'online' | 'offline'
}

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface TeamAgent {
  id: string
  name: string
  role: string
  href: string
}

export type ProspectStage = 'MQL' | 'SQL' | 'ICP'
export type SignalType = 'funding' | 'hiring' | 'job_change' | 'news'

export interface ProspectSignal {
  type: SignalType
  label: string
  daysAgo: number
}

export interface Prospect {
  id: string
  name: string
  title: string
  company: string
  stage: ProspectStage
  goal: string
  signal: ProspectSignal
  action: string
}
