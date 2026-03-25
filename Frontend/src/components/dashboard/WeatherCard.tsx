import { CloudSun, CloudRain, Sun, Cloud } from "lucide-react";

interface WeatherProps {
  temp: number;
  humidity: number;
  condition: string;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className="text-yellow-500" />;
    case "rain":
      return <CloudRain className="text-blue-500" />;
    case "clouds":
      return <Cloud className="text-gray-500" />;
    default:
      return <CloudSun className="text-yellow-500" />;
  }
};

const WeatherCard = ({ temp, humidity, condition }: WeatherProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
        {getWeatherIcon(condition)}
        Weather
      </h3>

      <p className="text-3xl font-bold">{temp}°C</p>

      <div className="mt-2 text-gray-600">
        <p>Humidity: {humidity}%</p>
        <p className="text-blue-500 capitalize">{condition}</p>
      </div>
    </div>
  );
};

export default WeatherCard;