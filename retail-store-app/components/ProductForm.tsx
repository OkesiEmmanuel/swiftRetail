'use client'
import { useEffect, useState } from 'react'

export default function ProductForm({ onSave }: { onSave?: (p: any) => void }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [stock, setStock] = useState<number | ''>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // trigger entrance animation
    const t = setTimeout(() => setMounted(true), 40)
    return () => clearTimeout(t)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name, category, price: Number(price), stock: Number(stock) }
    onSave?.(payload)
    setName('')
    setCategory('')
    setPrice('')
    setStock('')
    // subtle reset bounce
    setMounted(false)
    setTimeout(() => setMounted(true), 50)
  }

  return (
    <form
      onSubmit={submit}
      className={`mx-auto max-w-md p-6 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 ring-1 ring-black/5 transform transition-all duration-450 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Add Product</h3>

      <div className="space-y-3">
        {/* Floating input pattern using peer */}
        <div className="relative">
          <input
            id="name"
            placeholder=" "
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full bg-transparent border border-transparent rounded-md px-3 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all transform origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
          >
            Name
          </label>
          <div className="pointer-events-none absolute inset-0 rounded-md border border-transparent peer-focus:border-indigo-200"></div>
        </div>

        <div className="relative">
          <input
            id="category"
            placeholder=" "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="peer w-full bg-transparent border border-transparent rounded-md px-3 py-3 text-sm text-gray-700 dark:text-gray-200 placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          <label
            htmlFor="category"
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all transform origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
          >
            Category (optional)
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input
              id="price"
              placeholder=" "
              required
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              type="number"
              className="peer w-full bg-transparent border border-transparent rounded-md px-3 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <label
              htmlFor="price"
              className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all transform origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
            >
              Price
            </label>
          </div>

          <div className="relative">
            <input
              id="stock"
              placeholder=" "
              required
              value={stock}
              onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
              type="number"
              className="peer w-full bg-transparent border border-transparent rounded-md px-3 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <label
              htmlFor="stock"
              className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all transform origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-90"
            >
              Stock
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
        >
          <svg
            className="w-4 h-4 opacity-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          <span>Save Product</span>
        </button>
      </div>
    </form>
  )
}
