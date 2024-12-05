export default class WeatherFacade {
    // Get data facade
    static async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }
        return response.json();
    }

    // static fetchData(url: string): Observable<any> {
    //     return from(fetch(url));
    // }
}