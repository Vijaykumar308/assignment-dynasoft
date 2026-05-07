import type { LucideIcon } from 'lucide-react'

export interface User {
  id: string
  name: string
  workspace: string
  role: string
  status: 'online' | 'offline'
  avatarColor?: string
  avatarEmoji?: string
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
  domain: string
  companySize: string
  industry: string
  stage: ProspectStage
  goal: string
  signal: ProspectSignal
  action: string
  replied?: boolean
  replyPreview?: string
}

export interface Account {
  id: string
  companyName: string
  domain: string
  size: string
  industry: string
  signals: ProspectSignal[]
  recommendedAction: string
}

export interface Summary {
  prospectsToHunt: number
  contactsToNurture: number
  repliesWaiting: number
}

export type DashboardTab = 'hunt' | 'activate' | 'inbox'
export type DashboardView = 'contacts' | 'accounts'

export interface ProspectFilters {
  stages: ProspectStage[]
  signalTypes: SignalType[]
  goal: string
  dateRange: '7d' | '30d' | '90d' | 'custom' | ''
}
