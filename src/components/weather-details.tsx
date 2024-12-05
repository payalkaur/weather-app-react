import { WeatherData } from "@/api/types/weather-data-type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";

interface WeatherDetailsProps {
    data: WeatherData
}
export default function WeatherDetails({ data }: WeatherDetailsProps) {
    // Format sunrise and sunset time using date-fns
    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    };

    // Convert wind degree to direction
    function getWindDirection(degree: number) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index =
            Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
    };

    const details = [
        {
            title: "Sunrise",
            value: formatTime(data.sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(data.sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(data.wind.deg)} (${data.wind.deg}°)`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: "Pressure",
            value: `${data.main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        }
    ]

    return (
        <Card className="flex-1 flex-grow h-full">
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((detail) => (
                        <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-3">
                            <detail.icon size={18} className={`${detail.color}`} />
                            <div>
                                <p>{detail.title}</p>
                                <span className="text-sm text-gray-400">{detail.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}