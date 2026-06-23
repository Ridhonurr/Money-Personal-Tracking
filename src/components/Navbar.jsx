import { BanknoteArrowUp, ChartPie, LayoutGrid } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {useState} from "react";

const navItems = [
  { path: "/", icon: LayoutGrid, id: 1 },
  { path: "/mutation", icon: BanknoteArrowUp, id: 2  },
  { path: "/report",  icon: ChartPie, id: 3 }
];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-4">
        {navItems.map((item) => (
            <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-xs ${
                location.pathname === item.path
                ? "text-green-600 font-bold"
                : "text-gray-400"
            }`}
            >
            <item.icon />
            
            </button>
        ))}
        </nav>
    );
}
