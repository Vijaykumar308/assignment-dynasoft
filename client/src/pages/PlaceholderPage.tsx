import { useLocation } from 'react-router-dom'

export function PlaceholderPage() {
  const location = useLocation()

  return (
    <div className="p-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-sm font-medium text-gray-900">Coming soon</h1>
        <p className="mt-2 text-sm text-gray-600">{location.pathname} will be connected in a later step.</p>
      </section>
    </div>
  )
}
