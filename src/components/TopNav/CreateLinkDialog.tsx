"use client"

import { z } from "zod"

import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Loader2, Plus } from "lucide-react"

import { Loading } from "@types"

import { postLink } from "@actions"

import {
  Button,
  Dialog,
  DialogContent,
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
  url: z.string().min(1),
})

type LinkFormType = z.infer<typeof linkFormSchema>

export function CreateLinkDialog() {
  const [loading, setLoading] = useState(Loading.NotYet)

  const searchForm = useForm<LinkFormType>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(values: LinkFormType) {
    setLoading(Loading.Loading)
    await postLink(values.url)
    setLoading(Loading.Loaded)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2">
          <Plus className="text-gray-300" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>Add a New Link</DialogTitle>
          <div className="flex flex-col gap-3">
            <Form {...searchForm}>
              <form
                onSubmit={searchForm.handleSubmit(onSubmit)}
                className="flex w-full items-end gap-2"
              >
                <FormField
                  control={searchForm.control}
                  name="url"
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
                  disabled={loading === Loading.Loading}
                  className="flex gap-2 border-green-500 text-green-500"
                >
                  {loading === Loading.Loading && (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                  Create Link
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
