interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  src?: string
  colorIndex?: number
  colorClassName?: string
  fallback?: string
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

function getColor(name: string, colorIndex?: number) {
  if (typeof colorIndex === 'number') {
    return avatarColors[Math.abs(colorIndex) % avatarColors.length]
  }

  const total = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return avatarColors[total % avatarColors.length]
}

export function Avatar({ name, size = 'md', src, colorIndex, colorClassName, fallback }: AvatarProps) {
  const sizeClass =
    size === 'sm' ? 'h-7 w-7 text-xs' : size === 'lg' ? 'h-10 w-10 text-sm' : 'h-8 w-8 text-sm'

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} avatar`}
        className={`inline-flex shrink-0 rounded-full object-cover ${sizeClass}`}
      />
    )
  }

  return (
    <span
      aria-label={`${name} avatar`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium ${sizeClass} ${
        colorClassName ?? getColor(name, colorIndex)
      }`}
    >
      {fallback ?? getInitials(name)}
    </span>
  )
}
