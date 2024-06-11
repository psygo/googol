"use client"

import { z } from "zod"

import { useState } from "react"

import { Loader2 } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Loading } from "@types"

import { MAX_COMMENT_LENGTH } from "@db/settings"

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@shad"
import { postComment } from "../../server/actions/Comments/post_comment"
import { useParams } from "next/navigation"

const commentFormSchema = z.object({
  content: z.string().min(1).max(MAX_COMMENT_LENGTH),
})

type CommentFormType = z.infer<typeof commentFormSchema>

export function NewComment() {
  const [loading, setLoading] = useState(Loading.NotYet)
  const params = useParams()

  const searchForm = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  })

  async function onSubmit(values: CommentFormType) {
    setLoading(Loading.Loading)
    await postComment(
      params.link_id as string,
      values.content,
    )
    setLoading(Loading.Loaded)
  }

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-end gap-2"
      >
        <FormField
          control={searchForm.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>New Comment</FormLabel>
              <FormControl>
                <Textarea
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
          Create Comment
        </Button>
      </form>
    </Form>
  )
}
