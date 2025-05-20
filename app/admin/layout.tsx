import type React from "react"
import { AdminLayoutClient } from "./layout.client"

export const metadata = {
  title: "Admin - BeautéHub",
  description: "Panneau d'administration de BeautéHub",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
