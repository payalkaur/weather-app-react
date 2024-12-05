import { GenericTypeState } from "@/api/types/generic-type-state";
import { Coordinates } from "@/api/types/location-data-type";
import { useEffect, useState } from "react";

export function useGeolocation() {
    const [currentCoordinatesData, setCurrentCoordinatesData] = useState<GenericTypeState<Coordinates>>({
        data: null,
        error: null,
        isLoading: true
    })

    function getCurrentCoordinates() {
        setCurrentCoordinatesData((prev) => ({ ...prev, isLoading: true, error: null }));

        if (!navigator.geolocation) {
            setCurrentCoordinatesData({
                data: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(handleCurrentLocationSuccess, handleCurrentLocationError, {
            enableHighAccuracy: true, timeout: 5000, maximumAge: 0,
        });
    }

    function handleCurrentLocationSuccess(position: any) {
        setCurrentCoordinatesData(
            {
                data: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            }
        )
    }

    function handleCurrentLocationError(error: any) {
        let errorMessage: string;

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage =
                    "Location permission denied. Please enable location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
            default:
                errorMessage = "An unknown error occurred.";
        }

        setCurrentCoordinatesData({
            data: null,
            error: errorMessage,
            isLoading: false,
        })
    }

    // Get location on component mount
    useEffect(() => {
        getCurrentCoordinates();
    }, []);

    return { ...currentCoordinatesData, getCurrentCoordinates }

}