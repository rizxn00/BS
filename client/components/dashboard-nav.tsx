"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import { LayoutDashboard, User, LogOut } from "lucide-react"
import Image from "next/image"

export function DashboardNav() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/dashboard" className="font-bold">
          <Image src="/logo.svg" alt="logo" width={32} height={32}></Image>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant={pathname === "/dashboard" ? "default" : "ghost"} size="sm">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button variant={pathname === "/dashboard/profile" ? "default" : "ghost"} size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}

