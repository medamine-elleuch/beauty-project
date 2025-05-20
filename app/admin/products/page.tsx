"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Données fictives des produits
const initialProducts = [
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

export default function ProductsPage() {
  // État pour gérer les produits et les interactions utilisateur
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  })

  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Gérer l'ajout d'un nouveau produit
  const handleAddProduct = () => {
    const productToAdd = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      image: newProduct.image || `/placeholder.svg?height=50&width=50&text=${encodeURIComponent(newProduct.name)}`,
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    })
    setIsAddDialogOpen(false)
  }

  // Gérer la modification d'un produit
  const handleEditProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

    setProducts(updatedProducts)
    setIsEditDialogOpen(false)
  }

  // Gérer la suppression d'un produit
  const handleDeleteProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.filter((product) => product.id !== currentProduct.id)

    setProducts(updatedProducts)
    setIsDeleteDialogOpen(false)
  }

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
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                Vue d'ensemble
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary"
              >
                <Package className="h-4 w-4" />
                Produits
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
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
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Commandes
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Clients
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
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
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Paramètres
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        {/* En-tête avec barre de recherche */}
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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des produits..."
              className="w-full max-w-[400px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            <h1 className="text-2xl font-bold">Produits</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un Produit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
                  <DialogDescription>
                    Remplissez les détails pour ajouter un nouveau produit à votre inventaire.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nom du Produit</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soins de la Peau">Soins de la Peau</SelectItem>
                        <SelectItem value="Maquillage">Maquillage</SelectItem>
                        <SelectItem value="Soins Capillaires">Soins Capillaires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Prix (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">URL de l'Image</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="Laisser vide pour l'image par défaut"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddProduct}>Ajouter le Produit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Inventaire des Produits</CardTitle>
              <CardDescription>
                Gérez votre inventaire de produits, modifiez les détails et suivez les niveaux de stock.
              </CardDescription>
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
                  {filteredProducts.map((product) => (
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
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentProduct(product)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setCurrentProduct(product)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dialogue de modification de produit */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le Produit</DialogTitle>
            <DialogDescription>
              Mettez à jour les détails du produit et les informations d'inventaire.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nom du Produit</Label>
                <Input
                  id="edit-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Catégorie</Label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Soins de la Peau">Soins de la Peau</SelectItem>
                    <SelectItem value="Maquillage">Maquillage</SelectItem>
                    <SelectItem value="Soins Capillaires">Soins Capillaires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Prix (€)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    min="0"
                    value={currentProduct.stock}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        stock: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">URL de l'Image</Label>
                <Input
                  id="edit-image"
                  value={currentProduct.image}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditProduct}>Enregistrer les Modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de suppression de produit */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le Produit</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="flex items-center gap-4 py-4">
              <Image
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div>
                <h3 className="font-medium">{currentProduct.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentProduct.category} - {currentProduct.price.toFixed(2)} €
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Supprimer le Produit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
