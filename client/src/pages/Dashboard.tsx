import { HuntQueueTable } from '../components/dashboard/HuntQueueTable'
import { Toolbar } from '../components/dashboard/Toolbar'

export function Dashboard() {
  return (
    <div className="space-y-4 p-6">
      <Toolbar />
      <HuntQueueTable />
    </div>
  )
}
