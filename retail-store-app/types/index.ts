export type Role = 'staff' | 'manager' | 'admin'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
}

export interface Product {
  id: string
  name: string
  category?: string
  price: number
  stock: number
}

export interface Sale {
  id: string
  product_id: string
  product_name?: string
  user_id: string
  staff_name?: string
  quantity: number
  total_price: number
  date: string
}

export interface Receipt {
  id: string
  sale_id: string
  customer_name?: string
  customer_email?: string
  items?: Array<{ product_id: string; name: string; price: number; qty: number }>
  total?: number
  date?: string
}
export interface InventoryItem {
  id: number
  name: string
  category: string
  stock: number
  price: number
}
export interface StaffMember {
  id: number
  name: string
  role: Role
  totalSales: number
}
export interface Customer {
    id: number
    name: string
    total: number
    date: string
}
export interface ChartDataPoint {
    day: string
    sales: number
}