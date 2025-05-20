"use client"

import type React from "react"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayoutClient({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
