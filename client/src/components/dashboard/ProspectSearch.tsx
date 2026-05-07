import { SearchInput } from '../ui/SearchInput'

interface ProspectSearchProps {
  value: string
  onChange: (query: string) => void
}

export function ProspectSearch({ value, onChange }: ProspectSearchProps) {
  return <SearchInput value={value} onChange={onChange} placeholder="Search by prospect, signal, account..." />
}
