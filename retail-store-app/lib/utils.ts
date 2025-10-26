import { supabase, usingSupabase } from './supabaseClient';

export const formatCurrency = (value: number) => `₦${value.toLocaleString()}`
export const uid = () => Math.random().toString(36).slice(2, 9)
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
export const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleString(undefined, {
    year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

export async function getSalesData() {
  if (!usingSupabase) {
    const sales = (await import('@/sample-data/sales.json')).default;
    const staff = (await import('@/sample-data/staff.json')).default;
    
    // Process sales data to get leaderboard stats
    const staffStats = new Map();
    
    sales.forEach((sale: any) => {
      const staffMember = staffStats.get(sale.staff_name) || {
        id: staff.find((s: any) => s.name === sale.staff_name)?.id || '',
        name: sale.staff_name,
        sales: 0,
        transactions: 0,
        revenue: 0
      };
      
      staffMember.sales += sale.total_price;
      staffMember.transactions += 1;
      staffMember.revenue += sale.total_price;
      
      staffStats.set(sale.staff_name, staffMember);
    });
    
    return Array.from(staffStats.values());
  }
  
  // If using Supabase, modify this query according to your schema
  const { data } = await supabase!
    .from('sales')
    .select(`
      staff_name,
      sum(total_price) as sales,
      count(*) as transactions,
      sum(total_price) as revenue
    `)
    .group('staff_name');
    
  return data || [];
}