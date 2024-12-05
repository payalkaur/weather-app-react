import ModeToggle from "./mode-toggle";
import SearchBar from "./search-bar";
import icon from "@/assets/weather-forecast.png"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="flex justify-between p-4">
                <img className="w-14" src={icon} />

                <div className="flex gap-2 items-center">
                    <SearchBar />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}