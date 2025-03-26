import { PublicBlogList } from "@/components/public-blog-list"

export default function PublicBlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Blogs</h1>
          </div>
          <PublicBlogList />
        </div>
      </main>
    </div>
  )
}

