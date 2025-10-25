import { supabase, usingSupabase } from './supabaseClient'

export type Role = 'staff' | 'manager' | 'admin'

/**
 * Demo helper for RBAC. In production replace getCurrentUser with supabase.auth.getUser() + profiles lookup.
 */
export async function getCurrentUser() {
  if (!usingSupabase) {
    // Demo from env
    const id = process.env.CURRENT_USER_ID || 'demo-user-1'
    const role = (process.env.CURRENT_USER_ROLE || 'manager') as Role
    return { id, role, name: 'Demo User' }
  }
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
  return profile || { id: user.id, role: 'staff', name: user.email }
}

export function requireRole(allowed: Role[], currentRole?: Role) {
  const role = currentRole || (process.env.CURRENT_USER_ROLE as Role) || 'staff'
  return allowed.includes(role)
}
// Example usage:
// const user = await getCurrentUser()
// if (requireRole(['manager', 'admin'], user?.role)) {