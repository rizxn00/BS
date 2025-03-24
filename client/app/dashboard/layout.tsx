import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <DashboardNav />
        <div className="flex-1 p-8">{children}</div>
      </div>
    </ProtectedRoute>
  )
}

