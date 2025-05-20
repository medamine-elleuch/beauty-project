import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProductsPage() {
  // Données fictives des produits
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Produit de Beauté ${i + 1}`,
    category: i % 3 === 0 ? "Soins de la Peau" : i % 3 === 1 ? "Maquillage" : "Soins Capillaires",
    price: 29.99 + i,
    rating: 4 + (i % 2),
    reviews: 10 + i,
    image: `/placeholder.svg?height=400&width=400&text=Produit+${i + 1}`,
  }))

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
          <Link href="/cart">
            <Button variant="outline" size="icon">
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
              <span className="sr-only">Panier</span>
            </Button>
          </Link>
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
                    <Input type="search" placeholder="Rechercher des produits..." className="pl-8" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Catégories</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all" />
                      <label
                        htmlFor="all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tous les Produits
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skincare" />
                      <label
                        htmlFor="skincare"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Soins de la Peau
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="makeup" />
                      <label
                        htmlFor="makeup"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Maquillage
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="haircare" />
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
                      <Input type="number" id="min-price" placeholder="0 €" className="h-8" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="max-price" className="text-sm">
                        Max
                      </label>
                      <Input type="number" id="max-price" placeholder="100 €" className="h-8" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Évaluation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rating-5" />
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
                      <Checkbox id="rating-4" />
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
                      <Checkbox id="rating-3" />
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
                <Button className="w-full">Appliquer les Filtres</Button>
              </div>
            </aside>

            {/* Contenu principal avec liste de produits */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Tous les Produits</h1>
                <div className="flex items-center gap-4">
                  <Select defaultValue="featured">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="font-semibold">{product.price.toFixed(2)} €</div>
                        <Button size="sm" variant="secondary">
                          Voir Détails
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
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
                  <Button variant="outline" size="sm" className="font-medium">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
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
