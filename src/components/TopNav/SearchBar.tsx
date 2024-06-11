"use client"

import { z } from "zod"

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
  const searchForm = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
  })

  function onSubmit(values: SearchFormType) {
    console.log(values)
    
  }

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className="w-[40vw] max-w-[300px]"
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
