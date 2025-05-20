"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const [mounted, setMounted] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculer les frais de livraison (gratuits au-dessus de 50€)
  const shippingCost = subtotal > 50 ? 0 : 4.99

  // Calculer le total
  const total = subtotal - discount + shippingCost

  // Appliquer un code promo
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "bienvenue10") {
      setDiscount(subtotal * 0.1) // 10% de réduction
      setPromoApplied(true)
    } else {
      alert("Code promo invalide")
    }
  }

  // Ne rien rendre côté serveur
  if (!mounted) {
    return null
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
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/products" className="flex items-center text-sm hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continuer mes achats
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Vous n'avez pas encore ajouté de produits à votre panier. Découvrez notre collection et trouvez des
                produits qui vous plaisent.
              </p>
              <Link href="/products">
                <Button size="lg">Voir les produits</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Liste des produits */}
              <div className="md:col-span-2">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-3 flex justify-between font-medium">
                    <span>Produit</span>
                    <span>Total</span>
                  </div>
                  <ul className="divide-y">
                    {items.map((item) => (
                      <li key={item.product.id} className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                            <Image
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Supprimer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {item.product.price.toFixed(2)} € / unité
                            </span>
                            <div className="mt-2 flex items-center">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 hover:bg-muted"
                                  aria-label="Diminuer la quantité"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 hover:bg-muted"
                                  aria-label="Augmenter la quantité"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="ml-auto font-medium">
                                {(item.product.price * item.quantity).toFixed(2)} €
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" onClick={clearCart} size="sm">
                    Vider le panier
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" size="sm">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Résumé de la commande */}
              <div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-3 font-medium">Résumé de la commande</div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span>{subtotal.toFixed(2)} €</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Réduction</span>
                          <span>-{discount.toFixed(2)} €</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Livraison</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600">Gratuite</span>
                          ) : (
                            `${shippingCost.toFixed(2)} €`
                          )}
                        </span>
                      </div>
                      {subtotal < 50 && (
                        <div className="text-sm text-muted-foreground">
                          Plus que {(50 - subtotal).toFixed(2)} € pour la livraison gratuite
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">TVA incluse</div>
                    </div>

                    {!promoApplied && (
                      <div className="pt-4">
                        <p className="text-sm font-medium mb-2">Code promo</p>
                        <div className="flex gap-2">
                          <Input
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Entrez votre code"
                            className="flex-1"
                          />
                          <Button onClick={applyPromoCode} variant="outline">
                            Appliquer
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Essayez "BIENVENUE10" pour 10% de réduction
                        </div>
                      </div>
                    )}

                    <Button className="w-full mt-4" size="lg">
                      Passer à la caisse
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
