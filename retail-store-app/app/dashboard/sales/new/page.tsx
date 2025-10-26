"use client";

import React, { useState, useMemo } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Sample data
const staffList = [
  { id: "u1", name: "Amaka", role: "staff" },
  { id: "u2", name: "Tunde", role: "staff" },
  { id: "u3", name: "Chi", role: "manager" },
];

const products = [
  { id: "p1", name: "Coca Cola 50cl", category: "Beverages", price: 200, stock: 120 },
  { id: "p2", name: "Pepsi 50cl", category: "Beverages", price: 190, stock: 100 },
  { id: "p3", name: "Fanta 50cl", category: "Beverages", price: 180, stock: 90 },
];

interface Sale {
  id: string;
  product_id: string;
  product_name: string;
  staff_name: string;
  quantity: number;
  total_price: number;
  date: string;
}

export default function NewSalePage() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "s1",
      product_id: "p1",
      product_name: "Coca Cola 50cl",
      staff_name: "Amaka",
      quantity: 3,
      total_price: 600,
      date: "2025-05-01T09:12:00Z",
    },
    {
      id: "s2",
      product_id: "p2",
      product_name: "Pepsi 50cl",
      staff_name: "Tunde",
      quantity: 2,
      total_price: 380,
      date: "2025-05-01T10:02:00Z",
    },
  ]);

  const [formData, setFormData] = useState({
    product_id: "",
    staff_id: "",
    quantity: "",
  });
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Sale>("date");
  const [sortAsc, setSortAsc] = useState(true);

  const selectedProduct = products.find((p) => p.id === formData.product_id);
  const selectedStaff = staffList.find((s) => s.id === formData.staff_id);
  const total = selectedProduct ? Number(formData.quantity || 0) * selectedProduct.price : 0;

  const handleAddSale = () => {
    if (!formData.product_id || !formData.staff_id || !formData.quantity) return;

    const newSale: Sale = {
      id: `s${sales.length + 1}`,
      product_id: formData.product_id,
      product_name: selectedProduct!.name,
      staff_name: selectedStaff!.name,
      quantity: Number(formData.quantity),
      total_price: total,
      date: new Date().toISOString(),
    };

    setSales([...sales, newSale]);
    setFormData({ product_id: "", staff_id: "", quantity: "" });
  };

  const sortedSales = useMemo(() => {
    const filtered = sales.filter(
      (s) =>
        s.product_name.toLowerCase().includes(search.toLowerCase()) ||
        s.staff_name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "number" && typeof valB === "number")
        return sortAsc ? valA - valB : valB - valA;
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [sales, search, sortField, sortAsc]);

  const exportToCSV = () => {
    const csvRows = [
      ["Product", "Staff", "Quantity", "Total", "Date"],
      ...sales.map((s) => [
        s.product_name,
        s.staff_name,
        s.quantity,
        s.total_price,
        new Date(s.date).toLocaleString(),
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "sales.csv";
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Product", "Staff", "Quantity", "Total", "Date"]],
      body: sales.map((s) => [
        s.product_name,
        s.staff_name,
        s.quantity,
        s.total_price,
        new Date(s.date).toLocaleString(),
      ]),
    });
    doc.save("sales-report.pdf");
  };

  const handlePrint = () => window.print();

  return (
    <main className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Sale Form */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Sale
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              value={formData.product_id}
              onChange={(e) =>
                setFormData({ ...formData, product_id: e.target.value })
              }
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₦{p.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff
            </label>
            <select
              value={formData.staff_id}
              onChange={(e) =>
                setFormData({ ...formData, staff_id: e.target.value })
              }
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select staff</option>
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-gray-700">Total:</span>
          <span className="text-lg font-bold text-green-600">
            ₦{total || 0}
          </span>
        </div>

        <button
          onClick={handleAddSale}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Sale
        </button>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search sales..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Export PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto border border-gray-100">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {["Product", "Staff", "Quantity", "Total", "Date"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 font-semibold cursor-pointer"
                  onClick={() => {
                    const field = col.toLowerCase() as keyof Sale;
                    if (sortField === field) setSortAsc(!sortAsc);
                    else setSortField(field);
                  }}
                >
                  {col}
                  {sortField === col.toLowerCase() && (sortAsc ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{sale.product_name}</td>
                <td className="px-4 py-2">{sale.staff_name}</td>
                <td className="px-4 py-2">{sale.quantity}</td>
                <td className="px-4 py-2 text-green-600 font-medium">
                  ₦{sale.total_price}
                </td>
                <td className="px-4 py-2">
                  {new Date(sale.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
