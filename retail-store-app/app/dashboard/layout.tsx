'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { BarChart3, Users, Package, FileText, Settings, ShoppingBag } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Sales', href: '/dashboard/sales', icon: ShoppingBag },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Staff', href: '/dashboard/staff', icon: Users },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">SwiftRetail</h1>
        </div>
        <nav className="mt-4 space-y-1">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg mx-3 text-sm font-medium transition
                ${active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <Link
            href="/settings"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}
