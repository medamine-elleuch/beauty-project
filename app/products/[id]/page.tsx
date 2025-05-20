import { getProductById, getProducts } from "@/data/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartModal } from "@/components/cart-modal"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)
  const products = getProducts()

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* En-tête du site avec navigation */}
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
          <Link href="/products">
            <Button>Acheter</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12">
          <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux produits
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full object-cover aspect-square"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button key={index} className="border rounded-md overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - vue ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full object-cover aspect-square"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Nouveau
                  </span>
                )}
                {product.isBestseller && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Titre et prix */}
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary"
                            : i < product.rating
                              ? "fill-primary/50"
                              : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                </div>
                <p className="text-2xl font-bold mt-2">{product.price.toFixed(2)} €</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Caractéristiques */}
              <div>
                <h3 className="font-medium mb-2">Caractéristiques:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock */}
              <div>
                {product.stock > 0 ? (
                  <p className="text-sm text-green-600">En stock ({product.stock} disponibles)</p>
                ) : (
                  <p className="text-sm text-red-600">Rupture de stock</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <AddToCartButton product={product} className="flex-1" size="lg" showQuantity={true} />
                <Button variant="outline" size="lg" className="flex-1 gap-2">
                  <Heart className="h-5 w-5" />
                  Ajouter aux favoris
                </Button>
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    key={relatedProduct.id}
                    className="group relative overflow-hidden rounded-lg border"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        width={400}
                        height={400}
                        alt={relatedProduct.name}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-0.5 mt-1">
                        <Star className="h-4 w-4 fill-primary" />
                        <Star className="h-4 w-4 fill-primary" />
                        <Star className="h-4 w-4 fill-primary" />
                        <Star className="h-4 w-4 fill-primary" />
                        <Star className="h-4 w-4 fill-muted stroke-muted-foreground" />
                        <span className="ml-1 text-sm text-muted-foreground">({relatedProduct.reviews})</span>
                      </div>
                      <p className="mt-2 font-medium">{relatedProduct.price.toFixed(2)} €</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page avec liens et informations */}
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
