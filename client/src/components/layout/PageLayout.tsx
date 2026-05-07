import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import { currentUser } from '../../data/appData'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function PageLayout() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',system-ui,sans-serif] text-gray-900">
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-3 top-3 z-30 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <Sidebar
        user={currentUser}
        activeRoute={location.pathname}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex min-h-screen flex-col md:ml-16 lg:ml-[220px]">
        <TopBar user={currentUser} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
