import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useWeatherForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export default function CityWeather() {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");
    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const weatherForecastQuery = useWeatherForecastQuery(coordinates);

    if (!weatherForecastQuery.data || !weatherQuery.data) {
        return <div></div>
    }

    if (weatherQuery.error || weatherForecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                    Failed to load weather data. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !weatherForecastQuery.data || !params.cityName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
            </div>

            <div className="flex flex-nowrap justify-between items-center gap-4 p-2 ">
                <CurrentWeather data={weatherQuery.data} />
                <HourlyTemperature data={weatherForecastQuery.data} />
            </div>

            <div className="flex flex-nowrap justify-between gap-4 p-2">
                <WeatherDetails data={weatherQuery.data} />
                <WeatherForecast data={weatherForecastQuery.data} />
            </div>
        </div>
    )
}