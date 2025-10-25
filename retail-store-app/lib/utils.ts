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