import type { User } from '../../types'
import { GreetingBar } from '../dashboard/GreetingBar'
import { TabBar } from '../dashboard/TabBar'

interface TopBarProps {
  user: User
}

export function TopBar({ user }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <GreetingBar user={user} />
      <TabBar />
    </header>
  )
}
