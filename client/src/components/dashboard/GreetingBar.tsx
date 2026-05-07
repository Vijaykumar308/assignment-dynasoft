import { Avatar } from '../ui/Avatar'
import type { User } from '../../types'

interface GreetingBarProps {
  user: User
}

export function GreetingBar({ user }: GreetingBarProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <Avatar name={user.name} />
      <div>
        <h1 className="text-sm font-medium text-gray-900">Good morning, {user.name}</h1>
        <p className="text-sm text-gray-600">12 high-fit prospects are ready for outbound review.</p>
      </div>
    </div>
  )
}
