interface SkeletonProps {
  width?: string
  height?: string
  rounded?: string
}

export function Skeleton({ width = '100%', height = '1rem', rounded = 'rounded-md' }: SkeletonProps) {
  return <span className={`block animate-pulse bg-gray-200 ${rounded}`} style={{ width, height }} />
}
