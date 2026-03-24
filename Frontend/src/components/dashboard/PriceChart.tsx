import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

interface Props {
  data: {
    market: string;
    price: number;
  }[];
}

const PriceChart: React.FC<Props> = ({ data }) => {
  const maxPrice = Math.max(...data.map((d) => d.price));

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-1">
        Market Price Comparison
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        Today’s mandi prices across markets
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="market" />
          <YAxis domain={[0, maxPrice + 200]} />

          <Bar
            dataKey="price"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.price === maxPrice
                    ? "#22c55e"
                    : "#4f46e5"
                }
              />
            ))}
            <LabelList
              dataKey="price"
              position="top"
              formatter={(value: any) => `₹${value}`}
              style={{ fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;