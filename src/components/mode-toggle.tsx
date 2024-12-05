import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark";

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] text-blue-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
