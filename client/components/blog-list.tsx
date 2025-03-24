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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-0">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="py-4">
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-medium">No blogs found</h3>
          <p className="text-muted-foreground">Get started by creating a new blog.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog._id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>By {blog.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{blog.content}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

