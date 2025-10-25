import { NextResponse } from 'next/server'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

export async function GET() {
  if (usingSupabase) {
    if (!supabase) return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 })
    const { data, error } = await supabase.from('sales').select('*, products(*)').order('date', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }
  const data = await import('@/sample-data/sales.json')
  return NextResponse.json(data.default)
}

/**
 * Create sale + receipt transaction (serverless API)
 */
export async function POST(req: Request) {
  if (!usingSupabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 400 })
  if (!supabase) return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 })
  const body = await req.json()
  // Expect body: { product_id, user_id, quantity, total_price, customer_name?, customer_email? }
  const { product_id, user_id, quantity, total_price, customer_name, customer_email } = body
  const { data: sale, error: sErr } = await supabase.from('sales').insert([{ product_id, user_id, quantity, total_price }]).select().single()
  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 })

  const { data: receipt, error: rErr } = await supabase.from('receipts').insert([{ sale_id: sale.id, customer_name, customer_email }]).select().single()
  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 })

  // decrement product stock
  const { error: decErr } = await supabase.rpc('decrement_stock', { p_id: product_id, qty: quantity })
  if (decErr) {
    // swallow error but log for debugging
    console.warn('decrement_stock RPC error:', decErr.message)
  }

  return NextResponse.json({ sale, receipt })
}
