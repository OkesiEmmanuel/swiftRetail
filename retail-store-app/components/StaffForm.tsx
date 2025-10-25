'use client'
import { useState } from 'react'

export default function StaffForm({ onSave }: { onSave?: (u: any) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'staff' | 'manager' | 'admin'>('staff')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, email, role }
    onSave?.(payload)
    setName('')
    setEmail('')
    setRole('staff')
  }

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={submit}
        className="fadeInUp bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-md border border-white/8 rounded-2xl p-6 shadow-xl space-x-4 space-y-4"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white text-lg font-semibold">Add Staff</h3>
          <span className="text-sm text-white/60">Quick & smooth</span>
        </div>

        <div className="relative">
          <input
            id="name"
            placeholder=" "
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-3 text-sm text-white/60 pointer-events-none transform origin-left transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
          >
            Full name
          </label>
        </div>

        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-sm text-white/60 pointer-events-none transform origin-left transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <label className="block text-sm text-white/60 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-transform transform-gpu hover:scale-[1.01] focus:scale-[1.01]"
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium shadow-lg transform transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
          >
            Save Staff
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        <style jsx>{`
          .fadeInUp {
            animation: fadeInUp 320ms ease-out both;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </form>
    </div>
  )
}
