import { LogOut, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { primaryNavigation, resourceNavigation, teamAgents } from '../../data/appData'
import type { NavItem, User } from '../../types'
import { Avatar } from '../ui/Avatar'

interface SidebarProps {
  user: User
  activeRoute: string
}

function NavLinkItem({ item, activeRoute }: { item: NavItem; activeRoute: string }) {
  const Icon = item.icon
  const isActive = activeRoute === item.href

  return (
    <Link
      to={item.href}
      className={`flex items-center gap-3 border-l-[3px] py-2 pl-[13px] pr-4 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isActive
          ? 'border-indigo-600 bg-indigo-50 font-medium text-indigo-600'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {item.label}
    </Link>
  )
}

export function Sidebar({ user, activeRoute }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const workspaceInitial = user.workspace.charAt(0).toUpperCase()

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-screen w-[220px] flex-col overflow-y-auto border-r border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
          {workspaceInitial}
        </span>
        <span className="text-sm font-medium text-gray-900">{user.workspace}</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 py-4" aria-label="Sidebar navigation">
        <div className="space-y-1">
          {primaryNavigation.map((item) => (
            <NavLinkItem key={item.href} item={item} activeRoute={activeRoute} />
          ))}
        </div>

        <section className="space-y-2 px-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-gray-400">AI Revenue GTM Team</h2>
          <div className="space-y-1">
            {teamAgents.map((agent) => (
              <Link
                key={agent.id}
                to={agent.href}
                className="flex items-center gap-3 rounded-lg py-2 text-left transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Avatar name={agent.name} />
                <span>
                  <span className="block text-sm font-medium text-gray-900">{agent.name}</span>
                  <span className="block text-xs text-gray-400">{agent.role}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="px-4 text-xs font-medium uppercase tracking-wide text-gray-400">Resources</h2>
          <div className="space-y-1">
            {resourceNavigation.map((item) => (
              <NavLinkItem key={item.href} item={item} activeRoute={activeRoute} />
            ))}
          </div>
        </section>
      </nav>

      <div className="relative mt-auto border-t border-gray-200 p-4">
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
            <Avatar name={user.name} size="sm" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-600 ring-2 ring-white" />
          </span>
          <span className="text-sm font-medium text-gray-900">{user.name}</span>
        </button>
      </div>
    </aside>
  )
}
