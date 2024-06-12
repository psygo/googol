"use client"

import { z } from "zod"

import { type FormEvent, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@shad"

const searchFormSchema = z.object({
  search: z.string().min(1),
})

type SearchFormType = z.infer<typeof searchFormSchema>

export function SearchBar() {
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState(
    searchParams.get("search") ?? "",
  )

  const router = useRouter()
  const searchForm = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { search: searchText },
  })

  function onSearchChange(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement
    const newValue = target.value
    setSearchText(newValue)

    const newSearchParams = new URLSearchParams(
      searchParams,
    )
    newSearchParams.set("search", newValue)

    if (newValue === "") router.push("/")
    else router.push(`/?${newSearchParams.toString()}`)
  }

  return (
    <Form {...searchForm}>
      <form
        onChange={onSearchChange}
        className="w-full"
      >
        <FormField
          control={searchForm.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your search here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
