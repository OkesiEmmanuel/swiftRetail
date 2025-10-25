
import ReceiptsList from '@/components/ui/ReceiptList'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

async function getReceipts() {
  if (!usingSupabase) {
    const d = await import('@/sample-data/receipts.json')
    return d.default
  }
  const { data } = await supabase.from('receipts').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function CustomersPage() {
  const receipts = await getReceipts()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customer Receipts & History</h1>
      <ReceiptsList receipts={receipts} />
    </div>
  )
}
