'use client'
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function SalesChart({ data = [] }: { data?: any[] }) {
  const defaultData = [
    { day: 'Mon', sales: 300 },
    { day: 'Tue', sales: 450 },
    { day: 'Wed', sales: 500 },
    { day: 'Thu', sales: 350 },
    { day: 'Fri', sales: 600 },
    { day: 'Sat', sales: 750 },
    { day: 'Sun', sales: 400 }
  ]
  const chartData = data.length ? data : defaultData
  return (
    <div className="bg-dark p-4 rounded-2xl shadow hover: shadow-3xl shadow-lg">
      <h3 className="font-semibold mb-3 ml-3">Sales Trend</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
