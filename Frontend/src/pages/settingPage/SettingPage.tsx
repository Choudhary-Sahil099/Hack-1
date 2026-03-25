import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { statesData } from "../../data/indiaData";
import { User, MapPin, Lock, Bell } from "lucide-react";

const SettingsPage = () => {
  const [name, setName] = useState("Sahil");
  const [phone] = useState("9876543210");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [notifications, setNotifications] = useState(true);

  const selectedStateData = statesData.states.find(
    (s: any) => s.state === state
  );

  const handleSave = () => {
    alert("Settings updated successfully ✅");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100">

        {/* 🇮🇳 Govt Header */}
        <div className="bg-gradient-to-r from-blue-800 to-green-700 text-white p-5 shadow-md">
          <h1 className="text-xl font-semibold">
           Citizen Profile Settings
          </h1>
          <p className="text-sm opacity-90">
            नागरिक प्रोफ़ाइल सेटिंग्स 
          </p>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">

          {/* 👤 Citizen Info */}
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="border-b px-6 py-3 bg-gray-50 font-semibold flex items-center gap-2">
              <User size={18} /> Citizen Information
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Registered Mobile Number
                </label>
                <input
                  value={phone}
                  disabled
                  className="w-full mt-1 p-3 border rounded-md bg-gray-100 text-gray-500"
                />
                <p className="text-xs text-green-600 mt-1">
                  ✔ Verified Mobile Number
                </p>
              </div>
            </div>
          </div>

          {/* 📍 Location */}
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="border-b px-6 py-3 bg-gray-50 font-semibold flex items-center gap-2">
              <MapPin size={18} /> Address Details
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setDistrict("");
                  }}
                  className="w-full mt-1 p-3 border rounded-md"
                >
                  <option value="">Select State</option>
                  {statesData.states.map((s: any, i: number) => (
                    <option key={i} value={s.state}>
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  District
                </label>
                <select
                  value={district}
                  disabled={!state}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-md"
                >
                  <option value="">Select District</option>
                  {selectedStateData?.districts.map((d: string, i: number) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm">
            <div className="border-b px-6 py-3 bg-gray-50 font-semibold flex items-center gap-2">
              <Lock size={18} /> Security Settings
            </div>

            <div className="p-6 space-y-4">
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 border rounded-md"
              />
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={18} />
              <span className="font-medium">SMS / App Notifications</span>
            </div>

            <div
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
                notifications ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                  notifications ? "translate-x-7" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-blue-800 transition"
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;