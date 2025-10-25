import { supabase, usingSupabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getStaff() {
  if (!usingSupabase || !supabase) {
    const d = await import('@/sample-data/staff.json')
    return d.default
  }
  const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function StaffPage() {
  const staff = await getStaff()
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold pl-4 mt-4">Staff Management</h1>
        <Link href="/dashboard/staff/new" className="px-4 py-2 mt-3 bg-blue-600 text-white rounded">+ Add Staff</Link>
      </div>

      <table className="w-full border">
        <thead className="bg-dark-100">
          <tr className='bg-white hover:bg-dark text-white'>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s:any) => (
            <tr key={s.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3 capitalize">{s.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
