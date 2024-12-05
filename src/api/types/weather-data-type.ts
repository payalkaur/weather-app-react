import { Coordinates } from "./location-data-type"

export interface WeatherData {
    coord: Coordinates
    weather: WeatherCondition[]
    main: Main
    wind: Wind
    sys: Sys
    name: string
    dt: number
}

export interface WeatherCondition {
    id: number
    main: string
    description: string
    icon: string
}

export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

export interface Wind {
    speed: number
    deg: number
    gust: number
}

export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}