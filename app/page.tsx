import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

// Ajouter l'import pour les données de produits
import { getFeaturedProducts, type Product } from "@/data/products";

export default function LandingPage() {
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
          <Link href="/products">
            <Button>Acheter</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        {/* Section héro avec image et texte d'accroche */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Découvrez Votre Beauté Naturelle
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Des produits de soins et cosmétiques premium qui mettent en
                    valeur votre beauté naturelle. Sans cruauté et fabriqués
                    avec des ingrédients biologiques.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg" className="px-8">
                      Voir la Collection
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="px-8">
                      En Savoir Plus
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/beautebio.webp?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Image Principale"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section des produits en vedette */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Produits Vedettes
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Découvrez nos produits de beauté les plus populaires, adorés
                  par nos clients du monde entier
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {/* Afficher les produits vedettes */}
              {getFeaturedProducts().map((product: Product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      width={400}
                      height={400}
                      alt={product.name}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary"
                              : i < product.rating
                              ? "fill-primary/50"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <p className="mt-2 font-medium">
                      {product.price.toFixed(2)} €
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/products">
                <Button variant="outline" size="lg" className="gap-1">
                  Voir Tous les Produits
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section "Pourquoi nous choisir" */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Pourquoi Nous Choisir
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nous croyons en des produits de beauté qui sont bons pour
                    vous et pour la planète
                  </p>
                </div>
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-primary p-2 text-primary-foreground">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">100% Sans Cruauté</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous ne testons jamais sur les animaux et ne travaillons
                        qu'avec des fournisseurs éthiques
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-primary p-2 text-primary-foreground">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Ingrédients Naturels</h3>
                      <p className="text-sm text-muted-foreground">
                        Nos produits sont fabriqués avec des ingrédients
                        biologiques et durables
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-primary p-2 text-primary-foreground">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Emballage Écologique</h3>
                      <p className="text-sm text-muted-foreground">
                        Emballages recyclables et biodégradables pour réduire
                        l'impact environnemental
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Ingrédients Naturels"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section témoignages clients */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Témoignages Clients
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Découvrez ce que nos clients disent de nos produits
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {/* Boucle pour afficher les témoignages */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    <Star className="h-5 w-5 fill-primary" />
                    <Star className="h-5 w-5 fill-primary" />
                    <Star className="h-5 w-5 fill-primary" />
                    <Star className="h-5 w-5 fill-primary" />
                    <Star className="h-5 w-5 fill-primary" />
                  </div>
                  <p className="mb-4">
                    "J'utilise ces produits depuis 3 mois et ma peau n'a jamais
                    été aussi belle. Les ingrédients naturels font vraiment la
                    différence !"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=User+${i}`}
                        width={40}
                        height={40}
                        alt={`Client ${i}`}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Rania</h4>
                      <p className="text-sm text-muted-foreground">
                        Cliente Vérifiée
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Rejoignez Notre Newsletter
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Abonnez-vous pour recevoir des mises à jour sur les nouveaux
                  produits, les offres spéciales et des conseils beauté
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Entrez votre email"
                    type="email"
                  />
                  <Button type="submit">S'abonner</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  En vous abonnant, vous acceptez nos Conditions d'Utilisation
                  et notre Politique de Confidentialité.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pied de page avec liens et informations */}
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-medium">BeautéHub</h3>
              <p className="text-sm text-muted-foreground">
                Des produits de soins et cosmétiques premium qui mettent en
                valeur votre beauté naturelle.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Boutique</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tous les Produits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=skincare"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Soins de la Peau
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=makeup"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Maquillage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=haircare"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Soins Capillaires
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Mentions Légales</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Conditions d'Utilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Politique d'Expédition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-muted-foreground hover:text-foreground"
                  >
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
  );
}
