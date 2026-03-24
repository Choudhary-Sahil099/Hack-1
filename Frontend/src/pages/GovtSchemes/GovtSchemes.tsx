import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

interface Scheme {
  name: string;
  state: string;
  benefit: string;
  category: string;
}

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
        `http://localhost:5000/api/schemes?${query.toString()}`
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
      <div className="p-6 bg-gray-100 min-h-screen">

        {/* 🔽 Filters */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-4 flex-wrap">

          <select
            onChange={(e) => setState(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select State</option>
            <option>Punjab</option>
            <option>Himachal Pradesh</option>
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option>Insurance</option>
            <option>Subsidy</option>
            <option>Agriculture</option>
            <option>Income Support</option>
          </select>

        </div>

        {loading && (
          <p className="text-gray-500 mb-4">Loading schemes...</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {!loading && schemes.length === 0 ? (
            <p className="text-gray-500">No schemes found</p>
          ) : (
            schemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {scheme.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {scheme.category}
                </p>

                <p className="text-gray-700 text-sm">
                  {scheme.benefit}
                </p>

                <div className="mt-3 text-xs text-indigo-600 font-medium">
                  Applicable: {scheme.state}
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default SchemesPage;