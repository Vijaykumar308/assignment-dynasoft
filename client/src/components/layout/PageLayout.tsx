import { Outlet, useLocation } from 'react-router-dom'
import { currentUser } from '../../data/appData'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function PageLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',system-ui,sans-serif] text-gray-900">
      <Sidebar user={currentUser} activeRoute={location.pathname} />
      <div className="ml-[220px] flex min-h-screen flex-col">
        <TopBar user={currentUser} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
