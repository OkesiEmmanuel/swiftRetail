
import SalesChart from '@/components/charts/ChartCard'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

type LeaderboardRow = {
  staff_name: string
  total: number
}

function Leaderboard({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="bg-dark shadow-lg rounded p-4">
      <h2 className="text-lg font-medium mb-2">Leaderboard</h2>
      <ul>
        {rows.map((r, idx) => (
          <li key={r.staff_name + idx} className="flex justify-between py-1">
            <span>{r.staff_name}</span>
            <span className="font-semibold">₦{r.total}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getSales() {
  if (!usingSupabase) {
    const d = await import('@/sample-data/sales.json')
    const grouped = []
    return d.default
  }

  const { data } = await supabase!.from('sales').select('*').limit(50)
  return data || []
}

async function getLeaderboard() {
  if (!usingSupabase) {
    const s = await import('@/sample-data/sales.json')
    const map = new Map()
    s.default.forEach((s:any) => {
      map.set(s.staff_name, (map.get(s.staff_name)||0)+s.total_price)
    })
    const arr = Array.from(map.entries()).map(([staff_name,total])=>({staff_name,total}))
    return arr
  }
  const { data } = await supabase!.from('staff_leaderboard').select('*').limit(10)
  return data || []
}

export default async function DashboardPage() {
  const sales = await getSales();
  const leaderboard = await getLeaderboard();

  // simple chart data from sales
  const chartData = [
    { day: 'Mon', sales: 300 },
    { day: 'Tue', sales: 450 },
    { day: 'Wed', sales: 500 },
    { day: 'Thu', sales: 350 },
    { day: 'Fri', sales: 600 },
    { day: 'Sat', sales: 750 },
    { day: 'Sun', sales: 400 }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 m-3">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <SalesChart data={chartData} />
        </div>
        <div className='bg-dark md: flex flex-col py-3 px-2'>
          <Leaderboard rows={leaderboard.length ? leaderboard : [{staff_name:'Amaka', total:1600},{staff_name:'Tunde', total:1200}]} />
        </div>
      </div>
    </div>
  )
}
