import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import CurrentWeather from "@/components/current-weather"
import WeatherDetails from "@/components/weather-details"
import WeatherForecast from "@/components/weather-forecast"
import { useGeolocation } from "@/hooks/use-geolocation"
import HourlyTemperature from "@/components/hourly-temperature"
import WeatherSkeleton from "@/components/ui/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useReverseGeolocationQuery, useWeatherForecastQuery, useWeatherQuery } from "@/hooks/use-weather"

export default function WeatherDashboard() {
    const {
        data: coordinates,
        error: geolocationError,
        isLoading: isGeolocationLoading,
        getCurrentCoordinates
    } = useGeolocation()

    const weatherQuery = useWeatherQuery(coordinates);
    const weatherForecastQuery = useWeatherForecastQuery(coordinates);
    const reverseGeolocationQuery = useReverseGeolocationQuery(coordinates);

    function handleRefresh() {
        getCurrentCoordinates()
        weatherQuery.refetch()
        weatherForecastQuery.refetch()
        reverseGeolocationQuery.refetch()
    }

    if (isGeolocationLoading) {
        return <WeatherSkeleton />
    }

    if (geolocationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{geolocationError}</p>
                    <Button variant="outline" onClick={getCurrentCoordinates} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert>
                <MapPin className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button variant="outline" onClick={getCurrentCoordinates} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (weatherQuery.error || weatherForecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button variant="outline" onClick={handleRefresh} className="w-fit">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!weatherQuery.data || !weatherForecastQuery.data) {
        return <WeatherSkeleton />
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                    <RefreshCw className={`h-4 w-4 ${isGeolocationLoading ? "animate-spin" : ""}`}
                    />
                </Button>
            </div>

            <div className="flex flex-nowrap justify-between items-center gap-4 p-2 ">
                <CurrentWeather data={weatherQuery.data} locationName={reverseGeolocationQuery.data?.[0]} />
                <HourlyTemperature data={weatherForecastQuery.data} />
            </div>

            <div className="flex flex-nowrap justify-between gap-4 p-2">
                <WeatherDetails data={weatherQuery.data} />
                <WeatherForecast data={weatherForecastQuery.data} />
            </div>
        </div>
    )

}