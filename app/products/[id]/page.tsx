import Link from "next/link"
import Image from "next/image"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Données fictives du produit
  const product = {
    id: Number.parseInt(params.id),
    name: `Produit de Beauté ${params.id}`,
    description:
      "Notre produit de beauté premium est conçu pour mettre en valeur votre beauté naturelle. Fabriqué avec des ingrédients biologiques, ce produit est doux pour votre peau et offre des résultats durables. Parfait pour une utilisation quotidienne, il laissera votre peau fraîche et rajeunie.",
    longDescription:
      "Notre produit de beauté premium est conçu pour mettre en valeur votre beauté naturelle. Fabriqué avec des ingrédients biologiques, ce produit est doux pour votre peau et offre des résultats durables. Parfait pour une utilisation quotidienne, il laissera votre peau fraîche et rajeunie.\n\nPrincipaux avantages:\n- Hydrate et nourrit la peau\n- Réduit l'apparence des ridules et des rides\n- Améliore l'élasticité et la fermeté de la peau\n- Protège contre les dommages environnementaux\n- Convient à tous les types de peau\n\nMode d'emploi:\nAppliquez une petite quantité sur une peau propre et sèche. Massez doucement par mouvements circulaires jusqu'à absorption complète. Utilisez matin et soir pour de meilleurs résultats.",
    price: 29.99 + Number.parseInt(params.id),
    rating: 4.5,
    reviews: 120,
    category: "Soins de la Peau",
    inStock: true,
    images: [
      `/placeholder.svg?height=600&width=600&text=Produit+${params.id}+Principal`,
      `/placeholder.svg?height=600&width=600&text=Produit+${params.id}+Alt+1`,
      `/placeholder.svg?height=600&width=600&text=Produit+${params.id}+Alt+2`,
      `/placeholder.svg?height=600&width=600&text=Produit+${params.id}+Alt+3`,
    ],
    ingredients:
      "Eau, Glycérine, Alcool Cétéarylique, Triglycéride Caprylique/Caprique, Alcool Cétylique, Cétéareth-20, Stéarate de Glycéryle, Stéarate PEG-100, Diméthicone, Phénoxyéthanol, Acétate de Tocophéryle, Carbomère, Aminométhyl Propanol, EDTA Disodique, Éthylhexylglycérine, Parfum, Acide Citrique",
    howToUse:
      "Appliquez une petite quantité sur une peau propre et sèche. Massez doucement par mouvements circulaires jusqu'à absorption complète. Utilisez matin et soir pour de meilleurs résultats.",
    shippingInfo:
      "Livraison gratuite pour les commandes de plus de 50 €. La livraison standard prend 3 à 5 jours ouvrables. Livraison express disponible moyennant des frais supplémentaires.",
    returnPolicy:
      "Nous acceptons les retours dans les 30 jours suivant l'achat. L'article doit être inutilisé et dans son emballage d'origine.",
  }

  // Produits similaires fictifs
  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1 === Number.parseInt(params.id) ? i + 5 : i + 1,
    name: `Produit de Beauté ${i + 1 === Number.parseInt(params.id) ? i + 5 : i + 1}`,
    price: 29.99 + i,
    rating: 4 + (i % 2),
    reviews: 10 + i,
    image: `/placeholder.svg?height=400&width=400&text=Similaire+${i + 1}`,
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
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Panier</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Galerie d'images du produit */}
            <div className="md:w-1/2">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-lg border">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="aspect-square object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-lg border ${i === 0 ? "ring-2 ring-primary" : ""}`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Vue ${i + 1}`}
                        width={150}
                        height={150}
                        className="aspect-square object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Détails du produit */}
            <div className="md:w-1/2">
              <div className="flex flex-col gap-4">
                <div>
                  <Link
                    href={`/products?category=${product.category.toLowerCase()}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {product.category}
                  </Link>
                  <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : i < product.rating
                              ? "fill-primary text-primary"
                              : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {product.rating} ({product.reviews} avis)
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold">{product.price.toFixed(2)} €</div>
                <p className="text-muted-foreground">{product.description}</p>
                <Separator />

                {/* Options de taille */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Taille</h3>
                    <RadioGroup defaultValue="50ml" className="flex gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30ml" id="size-30" />
                        <Label htmlFor="size-30">30ml</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="50ml" id="size-50" />
                        <Label htmlFor="size-50">50ml</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="100ml" id="size-100" />
                        <Label htmlFor="size-100">100ml</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sélecteur de quantité */}
                  <div>
                    <h3 className="font-medium mb-2">Quantité</h3>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Diminuer</span>
                      </Button>
                      <div className="flex h-8 w-12 items-center justify-center border-y">1</div>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Augmenter</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button className="sm:flex-1" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ajouter au Panier
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-4 w-4" />
                    Ajouter aux Favoris
                  </Button>
                  <Button variant="outline" size="icon" className="h-11 w-11">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Partager</span>
                  </Button>
                </div>
                <Separator />

                {/* Accordéon d'informations supplémentaires */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ingredients">
                    <AccordionTrigger>Ingrédients</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="how-to-use">
                    <AccordionTrigger>Mode d'Emploi</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{product.howToUse}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Informations de Livraison</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{product.shippingInfo}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="returns">
                    <AccordionTrigger>Retours et Remboursements</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{product.returnPolicy}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Onglets de description et avis */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Avis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none">
                  <p>{product.longDescription}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Avis Clients</h3>
                    <Button>Écrire un Avis</Button>
                  </div>
                  <div className="grid gap-6">
                    {/* Boucle pour afficher les avis */}
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">Sophie Martin</h4>
                            <div className="flex items-center gap-0.5 mt-1">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-4 w-4 ${
                                    j < 5 - i ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2">
                          {i === 0
                            ? "J'adore absolument ce produit ! Il a fait une telle différence dans ma routine de soins. Ma peau est plus douce et plus radieuse après seulement quelques semaines d'utilisation."
                            : i === 1
                              ? "Très bon produit dans l'ensemble. J'ai remarqué des améliorations dans la texture et le teint de ma peau. La seule raison pour laquelle je lui donne 4 étoiles au lieu de 5 est le parfum, qui est un peu fort à mon goût."
                              : "Ce produit est bon mais pas extraordinaire. Il fait ce qu'il prétend faire, mais j'ai utilisé de meilleurs produits à ce prix. Je pourrais le racheter s'il est en promotion."}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Charger Plus d'Avis
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Section produits similaires */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Vous Pourriez Aussi Aimer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <div className="group overflow-hidden rounded-lg border hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < product.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <p className="mt-2 font-semibold">{product.price.toFixed(2)} €</p>
                    </div>
                  </div>
                </Link>
              ))}
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
