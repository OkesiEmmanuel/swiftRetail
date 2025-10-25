import { supabase, usingSupabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getSales() {
  if (!usingSupabase) {
    const d = await import('@/sample-data/sales.json')
    return d.default
  }
  const { data } = await supabase.from('sales').select('*').order('date', { ascending: false })
  return data || []
}

export default async function SalesPage() {
  const sales = await getSales()
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Link href="/dashboard/sales" className="px-4 py-2 bg-blue-600 text-white rounded">Record Sale</Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Staff</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Total</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s:any) => (
            <tr key={s.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{s.product_name || s.product?.name}</td>
              <td className="p-3">{s.staff_name || s.user_id}</td>
              <td className="p-3">{s.quantity}</td>
              <td className="p-3">₦{Number(s.total_price).toLocaleString()}</td>
              <td className="p-3">{new Date(s.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
