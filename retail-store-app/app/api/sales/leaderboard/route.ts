import { getSalesData } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getSalesData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    )
  }
}