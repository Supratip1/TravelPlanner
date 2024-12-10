import { useParams } from "react-router-dom";
export function CityPage() {
  const { cityName } = useParams();
  console.log('CityPage component rendered for city:', cityName);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to {cityName} Page!</h2>
    </div>
  );
}
