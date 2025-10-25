import { NextResponse } from 'next/server'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

export async function GET() {
  if (usingSupabase) {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }
  const data = await import('@/sample-data/staff.json')
  return NextResponse.json(data.default)
}

export async function POST(req: Request) {
  if (!usingSupabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 400 })
  const body = await req.json()
  const { data, error } = await supabase.from('users').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
