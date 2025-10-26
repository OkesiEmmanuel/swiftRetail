'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, PlusCircle, Filter } from 'lucide-react'

type Sale = {
  id: string
  product_id: string
  product_name: string
  user_id: string
  staff_name: string
  quantity: number
  total_price: number
  payment_method?: string
  date: string
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [search, setSearch] = useState('')
  const [filterMethod, setFilterMethod] = useState('')
  const [filterStaff, setFilterStaff] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')

  useEffect(() => {
    const loadSales = async () => {
      const d = await import('@/sample-data/sales.json')
      const salesWithPayments = d.default.map((s: any, idx: number) => ({
        ...s,
        payment_method: s.payment_method || (idx % 2 === 0 ? 'CASH' : 'POS'),
      }))
      setSales(salesWithPayments)
    }
    loadSales()
  }, [])

  // unique filters
  const staffNames = useMemo(
    () => Array.from(new Set(sales.map(s => s.staff_name))),
    [sales]
  )

  const paymentMethods = ['CASH', 'POS', 'TRANSFER']

  // filter logic
  const filtered = sales
    .filter(s => s.staff_name.toLowerCase().includes(filterStaff.toLowerCase()) || !filterStaff)
    .filter(s => !filterMethod || s.payment_method === filterMethod)
    .filter(
      s =>
        s.staff_name.toLowerCase().includes(search.toLowerCase()) ||
        s.product_name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === 'amount'
        ? b.total_price - a.total_price
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">🧾 Sales Records</h1>

        <Link
          href="/dashboard/sales/new"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} /> New Sale
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search sales..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 rounded-md w-full md:w-64 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterStaff}
            onChange={e => setFilterStaff(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Staff</option>
            {staffNames.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={filterMethod}
            onChange={e => setFilterMethod(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Payments</option>
            {paymentMethods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'amount')}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Staff</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Payment</th>
              <th className="px-4 py-3 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr
                key={i}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2 font-medium">{s.staff_name}</td>
                <td className="px-4 py-2">{s.product_name}</td>
                <td className="px-4 py-2 text-center">{s.quantity}</td>
                <td className="px-4 py-2 text-right font-semibold text-indigo-600">
                  ₦{s.total_price.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">{s.payment_method}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(s.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-6">
            No sales found.
          </p>
        )}
      </div>
    </main>
  )
}
