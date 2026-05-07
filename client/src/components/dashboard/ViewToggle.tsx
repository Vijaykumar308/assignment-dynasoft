import type { DashboardView } from '../../types'
import { ViewToggle as UIViewToggle } from '../ui/ViewToggle'

interface ViewToggleProps {
  value: DashboardView
  onChange: (view: DashboardView) => void
  contactsCount: number
  accountsCount: number
}

export function ViewToggle({ value, onChange, contactsCount, accountsCount }: ViewToggleProps) {
  return (
    <UIViewToggle
      ariaLabel="View toggle"
      value={value}
      onChange={onChange}
      options={[
        { value: 'contacts', label: `Contacts (${contactsCount})` },
        { value: 'accounts', label: `Accounts (${accountsCount})` },
      ]}
    />
  )
}
