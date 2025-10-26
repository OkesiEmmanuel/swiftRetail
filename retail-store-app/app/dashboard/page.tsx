
'use client'

import { useEffect, useState } from 'react'
import { supabase, usingSupabase } from '@/lib/supabaseClient'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

type Sale = {
  staff_name: string
  total_price: number
  payment_method: string
  created_at: string
}

type LeaderboardRow = {
  staff_name: string
  total: number
  last_sale: string
}

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042']

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

import Leaderboard from '@/components/ui/Leaderboard'
import { formatCurrency } from '@/lib/utils'

// ==================== Components ====================

function KPICard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
      <p className="text-gray-500 dark:text-gray-300 text-sm">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  )
}

function Leaderboard({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">🏆 Top Performing Staff</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {rows.map((r, idx) => (
          <li key={idx} className="flex justify-between py-2 text-sm">
            <span>{idx + 1}. {r.staff_name}</span>
            <div className="text-right">
              <span className="font-semibold block">{formatCurrency(r.total)}</span>
              <span className="text-xs text-gray-400">
                {new Date(r.last_sale).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PaymentLeaderboard({ data }: { data: { method: string; total: number }[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">💳 Sales by Payment Method</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="method"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function SalesTrendChart({ data }: { data: { day: string; sales: number }[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">📈 Weekly Sales Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ==================== Fetch Logic ====================

export default function DashboardPage() {
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    async function loadSales() {
      if (!usingSupabase) {
        // Local fallback
        const d = await import('@/sample-data/sales.json')
        const formatted = d.default.map((sale: any) => ({
          staff_name: sale.staff_name || sale.staff || 'Unknown Staff',
          total_price: sale.total_price || sale.amount || 0,
          payment_method: sale.payment_method || 'CASH',
          created_at: sale.created_at || sale.date || new Date().toISOString()
        }))
        setSales(formatted)
        return
      }

      // Supabase live data
      const { data, error } = await supabase!.from('sales').select('*').limit(100)
      if (error) console.error('Error fetching sales:', error)
      setSales(data || [])
    }

    loadSales()
  }, [])

  // KPIs
  const totalRevenue = sales.reduce((sum, s) => sum + s.total_price, 0)
  const totalTransactions = sales.length
  const avgTicket = totalTransactions ? totalRevenue / totalTransactions : 0

  // Leaderboard data
  const staffMap = new Map<string, LeaderboardRow>()
  sales.forEach(s => {
    if (!staffMap.has(s.staff_name)) {
      staffMap.set(s.staff_name, { staff_name: s.staff_name, total: s.total_price, last_sale: s.created_at })
    } else {
      const row = staffMap.get(s.staff_name)!
      row.total += s.total_price
      if (new Date(s.created_at) > new Date(row.last_sale)) row.last_sale = s.created_at
    }
  })
  const leaderboard = Array.from(staffMap.values()).sort((a, b) => b.total - a.total)

  // Payment leaderboard
  const payMap = new Map<string, number>()
  sales.forEach(s => payMap.set(s.payment_method, (payMap.get(s.payment_method) || 0) + s.total_price))
  const paymentLeaderboard = Array.from(payMap.entries()).map(([method, total]) => ({ method, total }))

  //  Dynamic weekly trend chart
  const dailySales = new Map<string, number>()
  DAYS.forEach(day => dailySales.set(day, 0))

  sales.forEach(s => {
    const day = DAYS[new Date(s.created_at).getDay()]
    dailySales.set(day, (dailySales.get(day) || 0) + s.total_price)
  })

  const chartData = DAYS.map(day => ({
    day,
    sales: dailySales.get(day) || 0,
  }))

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">🛍 Retail Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard label="Total Revenue" value={formatCurrency(totalRevenue)} />
        <KPICard label="Total Transactions" value={totalTransactions.toString()} />
        <KPICard label="Average Ticket" value={formatCurrency(avgTicket)} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrendChart data={chartData} />
        <PaymentLeaderboard data={paymentLeaderboard} />
      </div>

      {/* Leaderboard */}
      <Leaderboard rows={leaderboard.slice(0, 5)} />
    </main>
  )
}
