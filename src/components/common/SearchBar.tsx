"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@shad"

const formSchema = z.object({
  search: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>

export function SearchBar() {
  const searchForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
