import { CreateLinkDialog } from "./CreateLinkDialog"
import { SearchBar } from "./SearchBar"

export function TopNav() {
  return (
    <nav className="flex items-center justify-between bg-gray-900 px-3 py-3">
      <LeftNav />
      <RightNav />
    </nav>
  )
}

function LeftNav() {
  return (
    <div className="flex items-baseline gap-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Googol
      </h1>
      <h2 className="text-2xl text-gray-500">No AI bs</h2>
    </div>
  )
}

function RightNav() {
  return (
    <div className="flex gap-2">
      <SearchBar />
      <CreateLinkDialog />
    </div>
  )
}
