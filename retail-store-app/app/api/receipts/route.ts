import { NextResponse } from 'next/server'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

export async function GET() {
  if (usingSupabase) {
    const { data, error } = await supabase.from('receipts').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }
  const data = await import('@/sample-data/receipts.json')
  return NextResponse.json(data.default)
}
