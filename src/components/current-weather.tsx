import { WeatherData } from "@/api/types/weather-data-type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { GeocodingResponse } from "@/api/types/location-data-type";

export interface CurrentWeatherProps {
    data: WeatherData | null,
    locationName?: GeocodingResponse
}

export default function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
    function formatTemp(temp: number) {
        return `${Math.round(temp)}°`
    }

    return (
        <Card className="flex-1 flex-grow h-full">
            <CardContent className="flex gap-4 justify-between p-6">
                <div className="flex flex-col gap-4">
                    <div className="container">
                        <div className="flex items-center">
                            <h1 className="font-semibold text-lg">{data?.name}</h1>
                            {locationName?.state && (
                                <span className="text-gray-400">
                                    , {locationName.state}
                                </span>
                            )}
                        </div>

                        <span className="text-gray-400">{locationName?.country}</span>
                    </div>

                    <div className="flex gap-2 justify-between">
                        <div className="grid grid-cols-2 items-center">
                            <span className="text-7xl font-bold row-span-2">{data && formatTemp(data?.main.temp)}</span>

                            <div className="flex flex-col pt-1">
                                <p className="text-gray-400">Feels like {data && formatTemp(data?.main.feels_like)}</p>

                                <div className="flex gap-3 text-sm">
                                    <div className="flex gap-1 text-blue-500 items-center">
                                        <ArrowDown size={14} /><span>{data && formatTemp(data?.main.temp_min)}</span>
                                    </div>

                                    <div className="flex gap-1 text-red-500 items-center">
                                        <ArrowUp size={14} /><span>{data && formatTemp(data?.main.temp_max)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-12">
                        <div className="flex">
                            <div className="grid grid-cols-2 items-center">
                                <Droplets size={18} className="row-span-2 text-blue-500" />
                            </div>

                            <div className="flex flex-col">
                                <p>Humidity</p>
                                <span className="text-sm text-gray-400">{data?.main.humidity}%</span>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="grid grid-cols-2 items-center">
                                <Wind size={18} className="row-span-2 text-blue-500" />
                            </div>

                            <div className="flex flex-col">
                                <p>Wind Speed</p>
                                <span className="text-sm text-gray-400">{data?.wind.speed} m/s</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`} />
                    <span className="capitalize">{data?.weather[0].description}</span>
                </div>
            </CardContent>
        </Card>
    )
}