"use client"

import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Plus } from "lucide-react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@shad"

const linkFormSchema = z.object({
  link: z.string().min(1),
})

type LinkFormType = z.infer<typeof linkFormSchema>

export function CreateLinkDialog() {
  const searchForm = useForm<LinkFormType>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      link: "",
    },
  })

  function onSubmit(values: LinkFormType) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="px-2">
          <Plus className="text-gray-300" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>Add a New Link</DialogTitle>
          <DialogDescription>
            <Form {...searchForm}>
              <form
                onSubmit={searchForm.handleSubmit(onSubmit)}
                className="flex w-full items-end gap-2"
              >
                <FormField
                  control={searchForm.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>New Link</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Your search here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="border-green-500 text-green-500"
                >
                  Create Link
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
