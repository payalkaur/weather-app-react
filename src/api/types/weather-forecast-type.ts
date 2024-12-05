import { Coordinates } from "./location-data-type"
import { Main, WeatherCondition, Wind } from "./weather-data-type"

export interface ForecastData {
    list: List[]
    city: City
}

export interface List {
    dt: number
    main: Main
    weather: WeatherCondition[]
    wind: Wind
    dt_txt: string
}

export interface City {
    id: number
    name: string
    coord: Coordinates
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}