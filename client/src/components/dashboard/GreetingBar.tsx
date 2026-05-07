import type { User } from '../../types'
import { useSummary } from '../../hooks/useSummary'
import { CreatorAvatar } from '../ui/CreatorAvatar'

interface GreetingBarProps {
  user: User
}

export function GreetingBar({ user }: GreetingBarProps) {
  const { data: summary } = useSummary()

  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <CreatorAvatar size="lg" tone="warm" status={user.status} />
      <div>
        <h1 className="text-sm font-medium text-gray-900">Good morning, {user.name}</h1>
        <p className="text-sm text-gray-600">
          I have <strong className="font-semibold text-gray-900">{summary.prospectsToHunt}</strong>{' '}
          prospects to hunt,{' '}
          <strong className="font-semibold text-gray-900">{summary.contactsToNurture}</strong>{' '}
          contacts to nurture, and{' '}
          <strong className="font-semibold text-gray-900">{summary.repliesWaiting}</strong> replies
          waiting.
        </p>
      </div>
    </div>
  )
}
