import { API_CONFIG } from "./config";
import { Coordinates, GeocodingResponse } from "./types/location-data-type";
import { WeatherData } from "./types/weather-data-type";
import { ForecastData } from "./types/weather-forecast-type";
import WeatherFacade from "./weather.facade";


class WeatherAPI {
    private createUrl(endpoint: string, params: Record<string, string | number>) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        })
        return `${endpoint}?${searchParams.toString()}`
    }

    async getReverseGeocode({
        lat,
        lon,
    }: Coordinates): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: "1",
        });
        return WeatherFacade.fetchData<GeocodingResponse[]>(url);
    }

    async getCurrentWeather({
        lat,
        lon,
    }: Coordinates): Promise<WeatherData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat,
            lon: lon,
            units: "metric"
        });

        return WeatherFacade.fetchData<WeatherData>(url);
    }

    async getWeatherForecast({
        lat,
        lon,
    }: Coordinates): Promise<ForecastData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat,
            lon: lon,
            units: "metric"
        });

        return WeatherFacade.fetchData<ForecastData>(url);
    }

    async getLocationSuggestions(searchQuery: string): Promise<GeocodingResponse[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
            q: searchQuery,
            limit: "5",
        });

        return WeatherFacade.fetchData<GeocodingResponse[]>(url);
    }

    //     async function getLocationSuggestions(url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`) {
    //     try {
    //         const response = await axios.get(url);
    //         console.log(response.data)
    //         setLocations(response.data);
    //     } catch (error) {
    //         setLocations([])
    //         // setErrorData(error.response.data.message)
    //     }
    // }

}

export const weatherApi = new WeatherAPI()