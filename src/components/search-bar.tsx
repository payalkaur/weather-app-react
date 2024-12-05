import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "./ui/command"
import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useLocationSuggestionsQuery } from "@/hooks/use-weather";

export default function SearchBar() {
    const [openDialog, setOpenDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    
    const locationSuggestionsQuery = useLocationSuggestionsQuery(searchQuery)

    function handleLocationSelect(cityData: string) {
        const [lat, lon, name] = cityData.split("|");
        setOpenDialog(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    function handleSearchQueryChange(value: string) {
        if (value.length < 3) return;
        setSearchQuery(value)
    }

    return (
        <div className="container">
            <Button variant="outline" className="inline-flex gap-2 justify-start text-zinc-500 dark:bg-zinc-900 lg:min-w-[300px]" onClick={() => setOpenDialog(true)}>
                <Search />
                Search cities...
            </Button>

            <CommandDialog open={openDialog} onOpenChange={setOpenDialog}>
                <Command>
                    <CommandInput placeholder="Search cities..." onValueChange={handleSearchQueryChange} />

                    <CommandList>
                        {searchQuery.length > 2 && !locationSuggestionsQuery.isLoading && (
                            <CommandEmpty>No cities found.</CommandEmpty>
                        )}

                        {/* Search Results */}
                        <CommandSeparator />
                        {locationSuggestionsQuery.data && locationSuggestionsQuery.data.length > 0 && (
                            <CommandGroup heading="Suggestions">
                                {locationSuggestionsQuery.isLoading && (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                )}
                                {locationSuggestionsQuery.data?.map(location => (
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} onSelect={handleLocationSelect}>
                                        <Search />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                                        )}
                                        <span className="text-sm text-muted-foreground">, {location.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    )
}
