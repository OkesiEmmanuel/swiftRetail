import React from 'react';
import Link from 'next/link';

const sidebarItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Orders', href: '/orders' },
    { name: 'Customers', href: '/customers' },
    { name: 'Reports', href: '/reports' },
    { name: 'Settings', href: '/settings' },
];

const Sidebar: React.FC = () => (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 font-bold text-2xl border-b border-gray-700">
            Retail Store
        </div>
        <nav className="flex-1 p-4">
            <ul className="space-y-2">
                {sidebarItems.map(item => (
                    <li key={item.name}>
                        <Link href={item.href} className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
);

export default Sidebar;