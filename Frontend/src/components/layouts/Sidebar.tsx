import {
  LayoutDashboard,
  ShoppingBasket,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  SwatchBook,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideItems = [
  { key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
  { key: "market", path: "/market", icon: ShoppingBasket },
  { key: "analytics", path: "/analytics", icon: BarChart3 },
  { key: "schemes", path: "/schemes", icon: SwatchBook },
  { key: "settings", path: "/settings", icon: Settings },
];

const Sidebar: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`h-screen bg-white shadow-lg p-4 flex flex-col transition-all duration-300 ${
        minimized ? "w-20" : "w-64"
      }`}
    >
      {/* 🌾 Logo */}
      <div className="flex items-center justify-between py-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          {!minimized && (
            <h1 className="text-xl font-bold text-indigo-600">
              AgriSetu
            </h1>
          )}
        </div>

        <button
          onClick={() => setMinimized(!minimized)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {minimized ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      {/* 📌 Navigation */}
      <nav className="flex flex-col gap-2">
        {SideItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600 border-l-4 border-indigo-600"
                    : "text-gray-600 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              <Icon size={20} />

              {!minimized && (
                <span className="font-medium">
                  {t(item.key)}
                </span>
              )}
              {minimized && (
                <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {t(item.key)}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-5 border-t">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
          
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {!minimized && (
            <div>
              <p className="text-sm font-semibold">Sahil</p>
              <p className="text-xs text-gray-500">Himachal Pradesh</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;