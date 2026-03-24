import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { marketData } from "../../data/marketData";

const MarketPage = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");

  // 🔎 Filter logic
  const filteredData = marketData.filter((item) => {
    return (
      (state ? item.state === state : true) &&
      (district ? item.district === district : true) &&
      (crop ? item.commodity === crop : true)
    );
  });

  // 🏆 Best mandi
  const best =
    filteredData.length > 0
      ? filteredData.reduce((max, curr) =>
          curr.price > max.price ? curr : max
        )
      : null;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-screen">

        {/* 🔽 Filters */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-4 flex-wrap">
          
          <select onChange={(e) => setState(e.target.value)} className="p-2 border rounded">
            <option value="">Select State</option>
            <option>Himachal Pradesh</option>
            <option>Punjab</option>
          </select>

          <select onChange={(e) => setDistrict(e.target.value)} className="p-2 border rounded">
            <option value="">Select District</option>
            <option>Kangra</option>
            <option>Mandi</option>
            <option>Shimla</option>
            <option>Ludhiana</option>
          </select>

          <select onChange={(e) => setCrop(e.target.value)} className="p-2 border rounded">
            <option value="">Select Crop</option>
            <option>Wheat</option>
          </select>

        </div>

        {/* 🏆 Best Mandi */}
        {best && (
          <div className="bg-green-100 p-4 rounded-lg mb-6">
            <p className="font-semibold">
              Best Mandi: {best.market} (₹{best.price})
            </p>
          </div>
        )}

        {/* 📋 Table */}
        <div className="bg-white p-5 rounded-xl shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Market</th>
                <th>District</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.market}</td>
                  <td>{item.district}</td>
                  <td className="font-semibold">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MarketPage;