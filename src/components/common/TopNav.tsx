import { SearchBar } from "./SearchBar"

export function TopNav() {
  return (
    <div className="flex items-center justify-between bg-gray-900 p-2">
      <h1 className="text-3xl font-bold tracking-tight">
        Googol
      </h1>
      <SearchBar />
    </div>
  )
}
