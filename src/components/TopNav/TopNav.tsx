import Link from "next/link"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton as ClerkUserButton,
} from "@clerk/nextjs"

import { CreateLinkDialog } from "./CreateLinkDialog"
import { SearchBar } from "./SearchBar"
import { Button } from "../common/shad/button"

export function TopNav() {
  return (
    <nav className="flex items-center justify-between gap-2 bg-gray-900 px-3 py-3">
      <LeftNav />
      <RightNav />
    </nav>
  )
}

function LeftNav() {
  return (
    <>
      <Link href="/" className="flex items-baseline gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Googol
        </h1>
        <h2 className="hidden text-2xl text-gray-500 md:block">
          No AI b.s.
        </h2>
      </Link>
    </>
  )
}

function RightNav() {
  return (
    <div className="flex gap-2">
      <SearchBar />
      <SignedIn>
        <CreateLinkDialog />
      </SignedIn>
      <UserButton />
    </div>
  )
}

function UserButton() {
  return (
    <>
      <SignedOut>
        <Button
          asChild
          className="p-1 px-2"
          variant="secondary"
        >
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <ClerkUserButton />
      </SignedIn>
    </>
  )
}
