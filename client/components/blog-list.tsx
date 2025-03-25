"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchBlogs } from "@/lib/api"
import type { Blog } from "@/lib/types"

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs()
        setBlogs(data)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    getBlogs()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden shadow-md animate-pulse">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/5" />
              <Skeleton className="h-5 w-2/3 mt-2" />
            </CardHeader>
            <CardContent className="py-4">
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-5 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed">
        <h3 className="text-lg font-semibold">No blogs found</h3>
        <p className="text-muted-foreground">Start by creating a new blog.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog._id} className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
          <CardHeader>
            <CardTitle className="truncate">{blog.title}</CardTitle>
            <CardDescription className="text-sm">By {blog.authorId.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-gray-600">{blog.content}</p>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">{new Date(blog.addedAt).toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
