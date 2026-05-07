import { BarChart3, BookOpen, CalendarDays, Home } from 'lucide-react'
import type { NavItem, TeamAgent, User } from '../types'

export const currentUser: User = {
  id: 'user-lewis',
  name: 'Lewis',
  workspace: 'NXL',
  role: 'Account Executive',
  status: 'online',
}

export const primaryNavigation: NavItem[] = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: Home,
  },
]

export const teamAgents: TeamAgent[] = [
  {
    id: 'rocky',
    name: 'Rocky',
    role: 'Sales Coach',
    href: '/agents/rocky/settings',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Outbound Engine',
    href: '/agents/sarah/settings',
  },
  {
    id: 'chloe',
    name: 'Chloe',
    role: 'Content Assistant',
    href: '/agents/chloe/settings',
  },
]

export const resourceNavigation: NavItem[] = [
  {
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    label: 'Knowledge Base',
    href: '/knowledge-base',
    icon: BookOpen,
  },
  {
    label: 'Marketing Events',
    href: '/marketing-events',
    icon: CalendarDays,
  },
]
