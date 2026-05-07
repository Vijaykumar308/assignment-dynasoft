import { LogOut, Settings, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { primaryNavigation, resourceNavigation, teamAgents } from '../../data/appData'
import type { NavItem, User } from '../../types'
import { Avatar } from '../ui/Avatar'
import { CreatorAvatar } from '../ui/CreatorAvatar'

interface SidebarProps {
  user: User
  activeRoute: string
  isOpen?: boolean
  onClose?: () => void
}

function NavLinkItem({ item, activeRoute }: { item: NavItem; activeRoute: string }) {
  const Icon = item.icon
  const isActive = activeRoute === item.href

  return (
    <Link
      to={item.href}
      title={item.label}
      className={`flex items-center gap-3 border-l-[3px] py-2 pl-[13px] pr-4 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:pr-4 ${
        isActive
          ? 'border-indigo-600 bg-indigo-50 font-medium text-indigo-600'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="lg:inline md:hidden">{item.label}</span>
    </Link>
  )
}

function AgentAvatar({ name }: { name: string }) {
  if (name === 'Sarah') {
    return <CreatorAvatar size="md" tone="warm" />
  }

  if (name === 'Rocky' || name === 'Chloe') {
    return <CreatorAvatar size="md" tone={name === 'Rocky' ? 'deep' : 'gold'} />
  }

  return <Avatar name={name} />
}

export function Sidebar({ user, activeRoute, isOpen = false, onClose }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const workspaceInitial = user.workspace.charAt(0).toUpperCase()

  return (
    <>
      {isOpen ? <button type="button" aria-label="Close sidebar overlay" onClick={onClose} className="fixed inset-0 z-20 bg-gray-900/30 md:hidden" /> : null}
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex h-screen w-[220px] flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-150 md:translate-x-0 md:w-16 lg:w-[220px] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
          {workspaceInitial}
        </span>
        <span className="text-sm font-medium text-gray-900 md:hidden lg:inline">{user.workspace}</span>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="ml-auto rounded-lg p-1 text-gray-500 hover:bg-gray-50 md:hidden"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-6 py-4" aria-label="Sidebar navigation">
        <div className="space-y-1">
          {primaryNavigation.map((item) => (
            <NavLinkItem key={item.href} item={item} activeRoute={activeRoute} />
          ))}
        </div>

        <section className="space-y-2 px-4 md:px-3 lg:px-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-gray-400 md:hidden lg:block">AI Revenue GTM Team</h2>
          <div className="space-y-1">
            {teamAgents.map((agent) => (
              <Link
                key={agent.id}
                to={agent.href}
                title={`${agent.name} - ${agent.role}`}
                className="flex items-center gap-3 rounded-lg py-2 text-left transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <AgentAvatar name={agent.name} />
                <span className="md:hidden lg:inline">
                  <span className="block text-sm font-medium text-gray-900">{agent.name}</span>
                  <span className="block text-xs text-gray-400">{agent.role}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="px-4 text-xs font-medium uppercase tracking-wide text-gray-400 md:hidden lg:block">Resources</h2>
          <div className="space-y-1">
            {resourceNavigation.map((item) => (
              <NavLinkItem key={item.href} item={item} activeRoute={activeRoute} />
            ))}
          </div>
        </section>
      </nav>

      <div className="relative mt-auto border-t border-gray-200 p-4 md:px-3 lg:px-4">
        {isProfileOpen ? (
          <div className="absolute bottom-16 left-4 right-4 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Profile Settings
            </Link>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log Out
            </button>
          </div>
        ) : null}

        <button
          type="button"
          aria-expanded={isProfileOpen}
          onClick={() => setIsProfileOpen((current) => !current)}
          className="flex w-full items-center gap-3 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="relative">
            <CreatorAvatar size="sm" tone="warm" status={user.status} />
          </span>
          <span className="text-sm font-medium text-gray-900 md:hidden lg:inline">{user.name}</span>
        </button>
      </div>
    </aside>
    </>
  )
}
