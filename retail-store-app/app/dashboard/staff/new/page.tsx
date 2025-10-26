'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, usingSupabase } from '@/lib/supabaseClient'

export default function NewStaffPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'staff',
  })
  const [saving, setSaving] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      if (usingSupabase && supabase) {
        const { error } = await supabase.from('users').insert([
          {
            name: form.name,
            email: form.email,
            role: form.role,
          },
        ])
        if (error) throw error
      } else {
        console.log('Simulated save (local mode):', form)
      }

      alert('✅ Staff added successfully!')
      router.push('/dashboard/staff')
    } catch (error) {
      console.error('Error adding staff:', error)
      alert('❌ Failed to add staff. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Add New Staff</h1>
        <Link href="/dashboard/staff" className="text-blue-600 hover:underline">
          ← Back to Staff List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Amaka Johnson"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="e.g. amaka@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Link
            href="/dashboard/staff"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {saving ? 'Saving...' : 'Add Staff'}
          </button>
        </div>
      </form>
    </div>
  )
}
