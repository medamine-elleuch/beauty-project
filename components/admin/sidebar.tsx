"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  ChevronDown,
  CreditCard,
  Home,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
}

const SidebarItem = ({ href, icon, title, isActive }: SidebarItemProps) => {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        {icon}
        {title}
      </Button>
    </Link>
  );
};

interface SidebarGroupProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup = ({
  icon,
  title,
  children,
  defaultOpen = false,
}: SidebarGroupProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 font-normal"
        >
          {icon}
          {title}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <ShoppingBag className="h-5 w-5" />
          <span>BeautéHub Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col gap-1 px-2">
          <SidebarItem
            href="/admin"
            icon={<Home className="h-4 w-4" />}
            title="Tableau de bord"
            isActive={pathname === "/admin"}
          />

          <SidebarItem
            href="/admin/products"
            icon={<Box className="h-4 w-4" />}
            title="Produits"
            isActive={pathname === "/admin/products"}
          />

          <SidebarGroup
            icon={<Package className="h-4 w-4" />}
            title="Commandes"
            defaultOpen={pathname.includes("/admin/orders")}
          >
            <SidebarItem
              href="/admin/orders"
              icon={<Package className="h-4 w-4" />}
              title="Toutes les commandes"
              isActive={pathname === "/admin/orders"}
            />
            <SidebarItem
              href="/admin/orders/pending"
              icon={<CreditCard className="h-4 w-4" />}
              title="En attente"
              isActive={pathname === "/admin/orders/pending"}
            />
            <SidebarItem
              href="/admin/orders/shipped"
              icon={<Package className="h-4 w-4" />}
              title="Expédiées"
              isActive={pathname === "/admin/orders/shipped"}
            />
            <SidebarItem
              href="/admin/orders/delivered"
              icon={<Package className="h-4 w-4" />}
              title="Livrées"
              isActive={pathname === "/admin/orders/delivered"}
            />
          </SidebarGroup>

          <SidebarItem
            href="/admin/customers"
            icon={<Users className="h-4 w-4" />}
            title="Clients"
            isActive={pathname === "/admin/customers"}
          />

          <SidebarItem
            href="/admin/analytics"
            icon={<BarChart3 className="h-4 w-4" />}
            title="Analyses"
            isActive={pathname === "/admin/analytics"}
          />

          <SidebarGroup
            icon={<Settings className="h-4 w-4" />}
            title="Paramètres"
            defaultOpen={pathname.includes("/admin/settings")}
          >
            <SidebarItem
              href="/admin/settings"
              icon={<Settings className="h-4 w-4" />}
              title="Général"
              isActive={pathname === "/admin/settings"}
            />
            <SidebarItem
              href="/admin/settings/shipping"
              icon={<Package className="h-4 w-4" />}
              title="Livraison"
              isActive={pathname === "/admin/settings/shipping"}
            />
          </SidebarGroup>
        </div>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@beautehub.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
