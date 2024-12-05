import { BrowserRouter, Route, Routes } from "react-router-dom"
import WeatherDashboard from "./pages/weather-dashboard"
import { ThemeProvider } from "./components/theme-provider"
import Layout from "./components/layout"
import CityWeather from "./pages/city-weather"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PageNotFound from "./pages/NotFoundPage"

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityWeather />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

