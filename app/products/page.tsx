"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { CartModal } from "@/components/cart-modal"
import { AddToCartButton } from "@/components/add-to-cart-button"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { getProducts, type Product } from "@/data/products"

export default function ProductsPage() {
  // États pour les filtres et le tri
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({
    all: true,
    skincare: false,
    makeup: false,
    haircare: false,
  })
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedRatings, setSelectedRatings] = useState<Record<string, boolean>>({
    "5": false,
    "4": false,
    "3": false,
  })
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  // Charger les produits au chargement de la page
  useEffect(() => {
    const allProducts = getProducts()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  // Appliquer les filtres et le tri
  useEffect(() => {
    let result = [...products]

    // Filtre de recherche
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtre de catégorie
    if (!selectedCategories.all) {
      const categories: string[] = []
      if (selectedCategories.skincare) categories.push("skincare")
      if (selectedCategories.makeup) categories.push("makeup")
      if (selectedCategories.haircare) categories.push("haircare")

      if (categories.length > 0) {
        result = result.filter((product) => categories.includes(product.category))
      }
    }

    // Filtre de prix
    if (priceRange.min !== "") {
      result = result.filter((product) => product.price >= Number(priceRange.min))
    }
    if (priceRange.max !== "") {
      result = result.filter((product) => product.price <= Number(priceRange.max))
    }

    // Filtre d'évaluation
    const ratings: number[] = []
    if (selectedRatings["5"]) ratings.push(5)
    if (selectedRatings["4"]) ratings.push(4)
    if (selectedRatings["3"]) ratings.push(3)

    if (ratings.length > 0) {
      result = result.filter((product) => ratings.includes(Math.floor(product.rating)))
    }

    // Tri
    switch (sortOption) {
      case "newest":
        // Supposons que les IDs plus élevés sont les plus récents
        result.sort((a, b) => b.id - a.id)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default: // featured
        result.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1
          if (!a.isBestseller && b.isBestseller) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        })
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Réinitialiser à la première page après filtrage
  }, [products, searchQuery, selectedCategories, priceRange, selectedRatings, sortOption])

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Gestionnaires d'événements
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "all") {
      setSelectedCategories({
        all: checked,
        skincare: false,
        makeup: false,
        haircare: false,
      })
    } else {
      setSelectedCategories({
        ...selectedCategories,
        [category]: checked,
        all: false,
      })
    }
  }

  const handleRatingChange = (rating: string, checked: boolean) => {
    setSelectedRatings({
      ...selectedRatings,
      [rating]: checked,
    })
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange({
      ...priceRange,
      [type]: value,
    })
  }

  const handleApplyFilters = () => {
    // Les filtres sont déjà appliqués via useEffect
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Fonction pour traduire les catégories
  const translateCategory = (category: string) => {
    switch (category) {
      case "skincare":
        return "Soins de la Peau"
      case "makeup":
        return "Maquillage"
      case "haircare":
        return "Soins Capillaires"
      default:
        return category
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* En-tête avec navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">BeautéHub</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="font-medium">
            Accueil
          </Link>
          <Link href="/products" className="font-medium">
            Produits
          </Link>
          <Link href="/about" className="font-medium">
            À propos
          </Link>
          <Link href="/contact" className="font-medium">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <CartModal />
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Barre latérale avec filtres */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="sticky top-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Recherche</h3>
                  <div className="relative">
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
                    <Input
                      type="search"
                      placeholder="Rechercher des produits..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Catégories</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="all"
                        checked={selectedCategories.all}
                        onCheckedChange={(checked) => handleCategoryChange("all", checked === true)}
                      />
                      <label
                        htmlFor="all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tous les Produits
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="skincare"
                        checked={selectedCategories.skincare}
                        onCheckedChange={(checked) => handleCategoryChange("skincare", checked === true)}
                      />
                      <label
                        htmlFor="skincare"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Soins de la Peau
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="makeup"
                        checked={selectedCategories.makeup}
                        onCheckedChange={(checked) => handleCategoryChange("makeup", checked === true)}
                      />
                      <label
                        htmlFor="makeup"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Maquillage
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="haircare"
                        checked={selectedCategories.haircare}
                        onCheckedChange={(checked) => handleCategoryChange("haircare", checked === true)}
                      />
                      <label
                        htmlFor="haircare"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Soins Capillaires
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Fourchette de Prix</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="min-price" className="text-sm">
                        Min
                      </label>
                      <Input
                        type="number"
                        id="min-price"
                        placeholder="0 €"
                        className="h-8"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange("min", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="max-price" className="text-sm">
                        Max
                      </label>
                      <Input
                        type="number"
                        id="max-price"
                        placeholder="100 €"
                        className="h-8"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange("max", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Évaluation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rating-5"
                        checked={selectedRatings["5"]}
                        onCheckedChange={(checked) => handleRatingChange("5", checked === true)}
                      />
                      <label
                        htmlFor="rating-5"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rating-4"
                        checked={selectedRatings["4"]}
                        onCheckedChange={(checked) => handleRatingChange("4", checked === true)}
                      />
                      <label
                        htmlFor="rating-4"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <Star className="h-4 w-4 fill-muted stroke-muted-foreground" />
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rating-3"
                        checked={selectedRatings["3"]}
                        onCheckedChange={(checked) => handleRatingChange("3", checked === true)}
                      />
                      <label
                        htmlFor="rating-3"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <div className="flex items-center">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-muted stroke-muted-foreground" />
                          ))}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={handleApplyFilters}>
                  Appliquer les Filtres
                </Button>
              </div>
            </aside>

            {/* Contenu principal avec liste de produits */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  {filteredProducts.length} Produit{filteredProducts.length !== 1 ? "s" : ""}
                </h1>
                <div className="flex items-center gap-4">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">En Vedette</SelectItem>
                      <SelectItem value="newest">Plus Récent</SelectItem>
                      <SelectItem value="price-low">Prix: Croissant</SelectItem>
                      <SelectItem value="price-high">Prix: Décroissant</SelectItem>
                      <SelectItem value="rating">Mieux Notés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grille de produits */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <Card key={product.id} className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="aspect-square overflow-hidden relative">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                          {product.isNew && (
                            <span className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Nouveau
                            </span>
                          )}
                          {product.isBestseller && (
                            <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <Link href={`/products/${product.id}`} className="block">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{translateCategory(product.category)}</CardDescription>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : i < product.rating
                                    ? "fill-primary/50 text-primary/50"
                                    : "fill-muted stroke-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                        <div className="font-semibold">{product.price.toFixed(2)} €</div>
                        <div className="flex gap-2 w-full">
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              Voir Détails
                            </Button>
                          </Link>
                          <AddToCartButton product={product} size="sm" className="flex-1" />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Aucun produit trouvé</h3>
                  <p className="text-muted-foreground mt-2">
                    Essayez de modifier vos filtres pour voir plus de résultats.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8">
                  <nav className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
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
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      <span className="sr-only">Précédent</span>
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant="outline"
                        size="sm"
                        className={currentPage === page ? "font-medium bg-muted" : ""}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
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
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                      <span className="sr-only">Suivant</span>
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-medium">BeautéHub</h3>
              <p className="text-sm text-muted-foreground">
                Des produits de soins et cosmétiques premium qui mettent en valeur votre beauté naturelle.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Boutique</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground">
                    Tous les Produits
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=skincare" className="text-muted-foreground hover:text-foreground">
                    Soins de la Peau
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=makeup" className="text-muted-foreground hover:text-foreground">
                    Maquillage
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=haircare" className="text-muted-foreground hover:text-foreground">
                    Soins Capillaires
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Mentions Légales</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Conditions d'Utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                    Politique d'Expédition
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    Retours et Remboursements
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BeautéHub. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
