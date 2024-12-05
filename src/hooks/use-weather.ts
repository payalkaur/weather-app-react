import { Coordinates } from "@/api/types/location-data-type";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    weatherForecast: (coords: Coordinates) => ["weather-forecast", coords] as const,
    reverseGeolocation: (coords: Coordinates) => ["reverse-geolocation", coords] as const,
    locationSuggestions: (query: string) => ["location-suggestions", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    })
}

export function useWeatherForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weatherForecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.getWeatherForecast(coordinates) : null,
        enabled: !!coordinates
    })
}

export function useReverseGeolocationQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.reverseGeolocation(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.getReverseGeocode(coordinates) : null,
        enabled: !!coordinates
    })
}

export function useLocationSuggestionsQuery(searchQuery: string) {
    return useQuery({
        queryKey: WEATHER_KEYS.locationSuggestions(searchQuery),
        queryFn: () => weatherApi.getLocationSuggestions(searchQuery),
        enabled: searchQuery.length >= 3
    })
}