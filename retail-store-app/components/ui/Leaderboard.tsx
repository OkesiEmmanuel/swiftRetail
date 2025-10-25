'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {



    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface SalesData {
    id: string;
    name: string;
    sales: number;
    transactions: number;
    revenue: number;
}

type SortKey = 'sales' | 'transactions' | 'revenue';

const Leaderboard = () => {
    const [sortBy, setSortBy] = useState<SortKey>('sales');
    const [filterValue, setFilterValue] = useState<string>('');

    // Mock data - replace with your actual data
    const rawData: SalesData[] = [
        { id: '1', name: 'John Doe', sales: 150000, transactions: 89, revenue: 250000 },
        { id: '2', name: 'Jane Smith', sales: 180000, transactions: 95, revenue: 300000 },
        { id: '3', name: 'Mike Johnson', sales: 120000, transactions: 75, revenue: 200000 },
        // Add more data as needed
    ];

    const sortedAndFilteredData = useMemo(() => {
        return rawData
            .filter((item) =>
                item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .sort((a, b) => b[sortBy] - a[sortBy])
            .map((item, index) => ({ ...item, rank: index + 1 }));
    }, [rawData, sortBy, filterValue]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Sales Leaderboard</h1>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
                <select
                    className="p-2 border rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                >
                    <option value="sales">Sort by Sales</option>
                    <option value="transactions">Sort by Transactions</option>
                    <option value="revenue">Sort by Revenue</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by name..."
                    className="p-2 border rounded"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </div>

            {/* Chart */}
            <div className="h-[400px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedAndFilteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={sortBy} fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {sortedAndFilteredData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
                        >
                            <div className="text-2xl font-bold w-12">{item.rank}</div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className="text-sm text-gray-500">
                                    Sales: ${item.sales.toLocaleString()} | 
                                    Transactions: {item.transactions} | 
                                    Revenue: ${item.revenue.toLocaleString()}
                                </div>
                            </div>
                            <motion.div
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                    index === 0 ? 'bg-yellow-400' : 
                                    index === 1 ? 'bg-gray-300' : 
                                    index === 2 ? 'bg-amber-600' : 'bg-gray-100'
                                }`}
                                whileHover={{ scale: 1.1 }}
                            >
                                #{item.rank}
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Leaderboard;