interface AvatarProps {
  name: string
  size?: 'sm' | 'md'
}

const avatarColors = [
  'bg-indigo-100 text-indigo-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-pink-100 text-pink-700',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getColor(name: string) {
  const total = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return avatarColors[total % avatarColors.length]
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm'

  return (
    <span
      aria-label={`${name} avatar`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium ${sizeClass} ${getColor(name)}`}
    >
      {getInitials(name)}
    </span>
  )
}
