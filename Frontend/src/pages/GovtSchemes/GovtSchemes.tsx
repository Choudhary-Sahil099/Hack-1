import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

interface Scheme {
  name: string;
  state: string;
  benefit: string;
  category: string;
}
const dataStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Chandigarh",
  "Delhi",
  "Jammu and Kashmir",
];
const SchemesPage = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSchemes = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (state) query.append("state", state);
      if (category) query.append("category", category);

      const res = await fetch(
        `http://localhost:5000/api/schemes?${query.toString()}`,
      );

      const data = await res.json();
      setSchemes(data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [state, category]);

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
        {/* 🔍 Filters Section */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mr-4">
            🔍 Filter Schemes
          </h2>

          {/* 🌍 State */}
          <select
            onChange={(e) => setState(e.target.value)}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">🌍 Select State</option>
            {dataStates.map((stateName, index) => (
              <option key={index} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>

          {/* 📂 Category */}
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="">📂 Select Category</option>
            <option>Insurance</option>
            <option>Subsidy</option>
            <option>Agriculture</option>
            <option>Income Support</option>
          </select>

          <button
            onClick={() => {
              setState("");
              setCategory("");
            }}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>

        {/* ⏳ Loading */}
        {loading && (
          <div className="text-center text-gray-500 animate-pulse mb-6">
            🔄 Fetching best schemes for you...
          </div>
        )}

        {/* ❌ Empty */}
        {!loading && schemes.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            😕 No schemes found for selected filters
          </div>
        )}

        {/* 🧾 Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            schemes.map((scheme, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white relative">
                  {/* Category Badge */}
                  

                  <div className="flex items-center gap-3">
               
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                      {scheme.name.charAt(0)}
                    </div>

                    {/* 📌 Title */}
                    <h3 className="text-md font-semibold leading-tight">
                      {scheme.name}
                    </h3>
                  </div>
                </div>

                {/* 📄 BODY */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm line-clamp-4">
                    {scheme.benefit}
                  </p>

                  {/* 📍 Footer */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-green-600 font-medium">
                      📍 {scheme.state}
                    </span>

                    <button className="text-sm text-indigo-600 hover:underline">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchemesPage;
