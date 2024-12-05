export interface GenericTypeState<T> {
    data: T | null,
    error: string | null,
    isLoading: boolean
}