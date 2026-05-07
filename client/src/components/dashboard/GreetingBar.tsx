import { useQuery } from '@tanstack/react-query'
import { Avatar } from '../ui/Avatar'
import type { User } from '../../types'
import { summary as fallbackSummary } from '../../data/prospects'
import { fetchSummary } from '../../data/summary'

interface GreetingBarProps {
  user: User
}

export function GreetingBar({ user }: GreetingBarProps) {
  const { data: summary = fallbackSummary } = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    refetchInterval: 30_000,
  })

  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <Avatar
        name={user.name}
        size="lg"
        colorClassName={user.avatarColor}
        fallback={user.avatarEmoji}
      />
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
