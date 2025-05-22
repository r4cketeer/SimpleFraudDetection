import React from "react";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose, title="Dashboard", onOpen }) {
    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button onClick={onOpen}
                    className="text-2xl">
                ☰
                </button>
            </header>
            
            <aside
                className={`
                    fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-xl p-4
                    transform transition-transform duration-300 ease-in-out
                    md:static md:translate-x-0 md:transform-none md:h-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                {/* Mobile Close Button */}
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h2 className="text-xl font-bold">{ title }</h2>
                    <button
                        onClick={onClose}
                        className="text-xl text-gray-600 hover:text-red-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Desktop Title */}
                <h2 className="text-xl font-bold mb-6 hidden md:block">{ title }</h2>

                <nav className="space-y-2">
                    <a href="/dashboard" className="block text-gray-700 hover:text-blue-500">Dashboard</a>
                    <a href="/events" className="block text-gray-700 hover:text-blue-500">Events</a>
                    <a href="/queues" className="block text-gray-700 hover:text-blue-500">Queues</a>
                    <a href="/rules" className="block text-gray-700 hover:text-blue-500">Rules</a>
                    <a href="/logout" className="block text-gray-700 hover:text-red-500">Logout</a>
                </nav>
            </aside>

            {/* Mobile overlay */}
            {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                onClick={onClose}/>
            )}
        </>
    );
}
