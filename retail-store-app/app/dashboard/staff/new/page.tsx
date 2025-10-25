'use client'
import StaffForm from '@/components/StaffForm'
import { useRouter } from 'next/navigation'

export default function NewStaff() {
  const router = useRouter()
  async function onSave(payload:any) {
    await fetch('/api/staff', { method: 'POST', body: JSON.stringify(payload) })
    router.push('/dashboard/staff')
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-[30px]">Add Staff</h1>
      <StaffForm onSave={onSave} />
    </div>
  )
}
