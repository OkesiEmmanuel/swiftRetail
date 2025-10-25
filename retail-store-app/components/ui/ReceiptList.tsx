'use client'
import React from 'react'

export default function ReceiptsList({ receipts = [] }: { receipts: any[] }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-3">Customer Receipts</h3>
      <div className="space-y-3">
        {receipts.map((r: any) => (
          <div key={r.id} className="border p-3 rounded">
            <div className="flex justify-between">
              <div className="font-medium">Receipt #{r.id}</div>
              <div className="text-sm text-gray-500">{new Date(r.date || r.created_at).toLocaleString()}</div>
            </div>
            <ul className="mt-2 text-sm">
              {(r.items || []).map((it: any, i: number) => (
                <li key={i} className="flex justify-between">
                  <span>{it.name} x{it.qty}</span>
                  <span>₦{it.price * it.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-right font-semibold">Total: ₦{r.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
