export interface Coordinates {
    lat: number
    lon: number
}

// export interface GeolocationState {
//     coordinates: Coordinates | null,
//     error: string | null,
//     isLoading: boolean
// }

export interface GeocodingResponse {
    name: string
    local_names?: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
}

// export interface GenericTypeState<T> {
//     data: T | null,
//     error: string | null,
//     isLoading: boolean
// }