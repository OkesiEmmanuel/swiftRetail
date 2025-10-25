import type { Role } from '@/types'

export const Roles = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff'
} as const

export function canAccess(role: Role, resource: string) {
  const permissions: Record<string, Role[]> = {
    '/dashboard': [Roles.STAFF, Roles.MANAGER, Roles.ADMIN],
    '/dashboard/inventory': [Roles.MANAGER, Roles.ADMIN],
    '/dashboard/staff': [Roles.MANAGER, Roles.ADMIN],
    '/dashboard/reports': [Roles.MANAGER, Roles.ADMIN],
    '/dashboard/sales': [Roles.STAFF, Roles.MANAGER, Roles.ADMIN],
    '/dashboard/customers': [Roles.STAFF, Roles.MANAGER, Roles.ADMIN]
  }
  return (permissions[resource] || []).includes(role)
}
