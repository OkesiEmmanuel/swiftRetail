import { supabase, usingSupabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getProducts() {
  if (!usingSupabase) {
    const d = await import('@/sample-data/products.json')
    return d.default
  }
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function InventoryPage() {
  const products = await getProducts()
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Link href="/dashboard/inventory/new" className="px-4 py-2 bg-blue-600 text-white rounded">+ Add Product</Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p:any) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p className="mt-2">₦{Number(p.price).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
