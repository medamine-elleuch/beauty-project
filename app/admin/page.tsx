import Link from "next/link"
import Image from "next/image"
import { BarChart3, Package, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  // Données fictives pour le tableau de bord
  const recentOrders = [
    {
      id: "CMD-001",
      customer: "Sophie Martin",
      date: "2023-05-20",
      status: "Livré",
      total: 129.99,
    },
    {
      id: "CMD-002",
      customer: "Michel Dupont",
      date: "2023-05-19",
      status: "En traitement",
      total: 79.95,
    },
    {
      id: "CMD-003",
      customer: "Émilie Dubois",
      date: "2023-05-18",
      status: "Expédié",
      total: 149.5,
    },
    {
      id: "CMD-004",
      customer: "David Moreau",
      date: "2023-05-17",
      status: "Livré",
      total: 99.99,
    },
    {
      id: "CMD-005",
      customer: "Jessica Lambert",
      date: "2023-05-16",
      status: "En traitement",
      total: 189.95,
    },
  ]

  const products = [
    {
      id: 1,
      name: "Crème Hydratante Visage",
      category: "Soins de la Peau",
      price: 29.99,
      stock: 45,
      image: "/placeholder.svg?height=50&width=50&text=Produit+1",
    },
    {
      id: 2,
      name: "Mascara Volumisant",
      category: "Maquillage",
      price: 19.99,
      stock: 32,
      image: "/placeholder.svg?height=50&width=50&text=Produit+2",
    },
    {
      id: 3,
      name: "Shampooing Nourrissant",
      category: "Soins Capillaires",
      price: 24.99,
      stock: 28,
      image: "/placeholder.svg?height=50&width=50&text=Produit+3",
    },
    {
      id: 4,
      name: "Sérum Anti-Âge",
      category: "Soins de la Peau",
      price: 49.99,
      stock: 15,
      image: "/placeholder.svg?height=50&width=50&text=Produit+4",
    },
    {
      id: 5,
      name: "Rouge à Lèvres Mat",
      category: "Maquillage",
      price: 22.99,
      stock: 37,
      image: "/placeholder.svg?height=50&width=50&text=Produit+5",
    },
    {
      id: 6,
      name: "Tonique Hydratant",
      category: "Soins de la Peau",
      price: 34.99,
      stock: 20,
      image: "/placeholder.svg?height=50&width=50&text=Produit+6",
    },
    {
      id: 7,
      name: "Masque Réparateur Cheveux",
      category: "Soins Capillaires",
      price: 27.99,
      stock: 18,
      image: "/placeholder.svg?height=50&width=50&text=Produit+7",
    },
    {
      id: 8,
      name: "Fond de Teint",
      category: "Maquillage",
      price: 39.99,
      stock: 25,
      image: "/placeholder.svg?height=50&width=50&text=Produit+8",
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Barre latérale de navigation */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="font-bold">BeautéHub Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide">Tableau de Bord</h2>
            <div className="space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary"
              >
                <BarChart3 className="h-4 w-4" />
                Vue d'ensemble
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Package className="h-4 w-4" />
                Produits
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <ShoppingCart className="h-4 w-4" />
                Commandes
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Users className="h-4 w-4" />
                Clients
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Paramètres
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        {/* En-tête avec barre de recherche et menu utilisateur */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 5h18" />
                <path d="M3 12h18" />
                <path d="M3 19h18" />
              </svg>
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input type="search" placeholder="Rechercher..." className="w-full max-w-[400px] pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=A"
                  alt="Admin"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="sr-only">Menu utilisateur</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Tableau de Bord</h1>
            <div className="flex items-center gap-2">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Ajouter un Produit
              </Button>
            </div>
          </div>

          {/* Cartes statistiques */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 231,89 €</div>
                <p className="text-xs text-muted-foreground">+20,1% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+10,5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Produits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+8 nouveaux produits ajoutés</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+18,7% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          {/* Onglets produits et commandes récentes */}
          <div className="mt-6">
            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="orders">Commandes Récentes</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center">
                    <CardTitle>Produits</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      <Input placeholder="Rechercher des produits..." className="max-w-[250px]" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Filtrer
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="ml-2 h-4 w-4"
                            >
                              <path d="M3 6h18" />
                              <path d="M7 12h10" />
                              <path d="M10 18h4" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Soins de la Peau</DropdownMenuItem>
                          <DropdownMenuItem>Maquillage</DropdownMenuItem>
                          <DropdownMenuItem>Soins Capillaires</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Prix</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded-md"
                                />
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price.toFixed(2)} €</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  product.stock > 30
                                    ? "bg-green-100 text-green-800"
                                    : product.stock > 10
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.stock}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4"
                                    >
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="12" cy="5" r="1" />
                                      <circle cx="12" cy="19" r="1" />
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                                  <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes Récentes</CardTitle>
                    <CardDescription>Gérez les commandes récentes de vos clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  order.status === "Livré"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "En traitement"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell>{order.total.toFixed(2)} €</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Voir
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
