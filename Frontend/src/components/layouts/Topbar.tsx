import { useAuth } from "../../context/AuthContext";
import { Bell, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      
      {/* Welcome Text */}
      <h1 className="font-semibold text-lg">
        {t("welcome")}{" "}
        <span className="text-2xl text-indigo-700 font-bold">
          {user?.name}
        </span>
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* 🌐 Language Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className="hover:text-indigo-600 font-medium"
          >
            EN
          </button>
          <span>|</span>
          <button
            onClick={() => i18n.changeLanguage("hi")}
            className="hover:text-indigo-600 font-medium"
          >
            हिंदी
          </button>
        </div>

        {/* 🔔 Notification */}
        <Bell
          size={26}
          className="cursor-pointer hover:scale-105 transition text-indigo-700 bg-indigo-100 rounded-lg p-1"
        />

        {/* 👤 Profile */}
        <UserCircle
          size={28}
          className="cursor-pointer hover:scale-105 transition text-indigo-700"
        />

        {/* 🚪 Logout */}
        <button
          onClick={logout}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-500 hover:scale-105 transition"
        >
          {t("logout")}
        </button>

      </div>
    </div>
  );
};

export default Topbar;