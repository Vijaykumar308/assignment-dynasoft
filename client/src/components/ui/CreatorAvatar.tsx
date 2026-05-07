interface CreatorAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  tone?: 'warm' | 'deep' | 'gold'
  className?: string
  status?: 'online' | 'offline'
}

const sizes = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

const tones = {
  warm: {
    skin: '#c8793f',
    skinLight: '#f0a15e',
    hair: '#5b2d18',
    shirt: '#14b8a6',
  },
  deep: {
    skin: '#8d542f',
    skinLight: '#d1864d',
    hair: '#1f1714',
    shirt: '#111827',
  },
  gold: {
    skin: '#ba6c32',
    skinLight: '#e99b55',
    hair: '#3b2418',
    shirt: '#4f46e5',
  },
}

export function CreatorAvatar({ size = 'lg', tone = 'warm', className = '', status }: CreatorAvatarProps) {
  const palette = tones[tone]

  return (
    <span className={`relative inline-flex shrink-0 ${sizes[size]} ${className}`} aria-label="3D creator avatar">
      <svg viewBox="0 0 64 64" role="img" className="h-full w-full drop-shadow-sm">
        <defs>
          <radialGradient id={`skin-${tone}`} cx="35%" cy="25%" r="68%">
            <stop offset="0%" stopColor={palette.skinLight} />
            <stop offset="72%" stopColor={palette.skin} />
            <stop offset="100%" stopColor="#7a3f22" />
          </radialGradient>
          <linearGradient id={`shirt-${tone}`} x1="18" x2="46" y1="49" y2="62">
            <stop offset="0%" stopColor={palette.shirt} />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill="#f8fafc" />
        <ellipse cx="32" cy="57" rx="17" ry="8" fill={`url(#shirt-${tone})`} />
        <circle cx="32" cy="30" r="19" fill={`url(#skin-${tone})`} />
        <path
          d="M15 29c1-13 9-20 19-20 9 0 16 6 17 16-6-6-14-8-24-6-5 1-9 4-12 10Z"
          fill={palette.hair}
        />
        <path d="M18 23c5-9 13-12 23-8 3 1 6 4 8 8-10-5-20-5-31 0Z" fill="#6b341d" opacity=".55" />
        <circle cx="24" cy="31" r="4.2" fill="#fff" opacity=".82" />
        <circle cx="40" cy="31" r="4.2" fill="#fff" opacity=".82" />
        <circle cx="24" cy="31" r="1.8" fill="#111827" />
        <circle cx="40" cy="31" r="1.8" fill="#111827" />
        <path d="M28.5 31h7" stroke="#7c3f1f" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21 28.5c2.2-1.2 4.4-1.2 6.4 0M36.8 28.5c2.2-1.2 4.4-1.2 6.4 0" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" opacity=".75" />
        <path d="M31 32.5c-1 2.6-1.4 4.4-1.1 5.4.3.8 1.3 1.2 3.1 1.2" stroke="#87451f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M25.5 43c4.4 3.4 9.1 3.4 13.8 0" stroke="#5b2d18" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="19" cy="37" r="2.4" fill="#e99558" opacity=".65" />
        <circle cx="45" cy="37" r="2.4" fill="#e99558" opacity=".65" />
      </svg>
      {status ? (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            status === 'online' ? 'bg-green-600' : 'bg-gray-400'
          }`}
        />
      ) : null}
    </span>
  )
}
