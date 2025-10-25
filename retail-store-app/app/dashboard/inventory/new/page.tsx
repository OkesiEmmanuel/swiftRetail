'use client'
import ProductForm from '@/components/ProductForm'
import { useRouter } from 'next/navigation'

export default function NewProduct() {
  const router = useRouter()
  async function save(payload:any) {
    // call API
    await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload) })
    router.push('/dashboard/inventory')
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <ProductForm onSave={save} />
    </div>
  )
}
