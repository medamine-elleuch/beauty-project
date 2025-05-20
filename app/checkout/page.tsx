"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, CheckCircle2, Truck, ShieldCheck, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState("shipping")
  const [orderComplete, setOrderComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Informations de livraison
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  })

  // Informations de paiement
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Options de livraison
  const [shippingMethod, setShippingMethod] = useState("standard")

  // Calcul des frais de livraison
  const getShippingCost = () => {
    if (subtotal > 50) return 0
    return shippingMethod === "standard" ? 4.99 : 9.99
  }

  // Calcul du total
  const shippingCost = getShippingCost()
  const taxRate = 0.2 // TVA à 20%
  const taxAmount = subtotal * taxRate
  const total = subtotal + shippingCost

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Rediriger si le panier est vide
  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      router.push("/cart")
    }
  }, [mounted, items, router, orderComplete])

  // Validation du formulaire de livraison
  const validateShippingForm = () => {
    const errors: Record<string, string> = {}

    if (!shippingInfo.firstName.trim()) errors.firstName = "Le prénom est requis"
    if (!shippingInfo.lastName.trim()) errors.lastName = "Le nom est requis"
    if (!shippingInfo.email.trim()) errors.email = "L'email est requis"
    if (!/^\S+@\S+\.\S+$/.test(shippingInfo.email)) errors.email = "Email invalide"
    if (!shippingInfo.phone.trim()) errors.phone = "Le téléphone est requis"
    if (!shippingInfo.address.trim()) errors.address = "L'adresse est requise"
    if (!shippingInfo.city.trim()) errors.city = "La ville est requise"
    if (!shippingInfo.postalCode.trim()) errors.postalCode = "Le code postal est requis"
    if (!/^\d{5}$/.test(shippingInfo.postalCode)) errors.postalCode = "Code postal invalide"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Validation du formulaire de paiement
  const validatePaymentForm = () => {
    const errors: Record<string, string> = {}

    if (!paymentInfo.cardNumber.trim()) errors.cardNumber = "Le numéro de carte est requis"
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ""))) errors.cardNumber = "Numéro de carte invalide"

    if (!paymentInfo.cardName.trim()) errors.cardName = "Le nom sur la carte est requis"

    if (!paymentInfo.expiryDate.trim()) errors.expiryDate = "La date d'expiration est requise"
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) errors.expiryDate = "Format invalide (MM/YY)"

    if (!paymentInfo.cvv.trim()) errors.cvv = "Le code de sécurité est requis"
    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) errors.cvv = "CVV invalide"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Gestion des changements d'étape
  const handleNextStep = () => {
    if (activeStep === "shipping") {
      if (validateShippingForm()) {
        setActiveStep("payment")
      }
    } else if (activeStep === "payment") {
      if (validatePaymentForm()) {
        setActiveStep("review")
      }
    }
  }

  // Gestion de la soumission de la commande
  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    }, 2000)
  }

  // Gestion des changements dans le formulaire de livraison
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Gestion des changements dans le formulaire de paiement
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target

    // Formatage du numéro de carte
    if (name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      value = value.substring(0, 19) // Limiter à 16 chiffres + 3 espaces
    }

    // Formatage de la date d'expiration
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "")
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
    }

    // Limiter le CVV à 3-4 chiffres
    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 4)
    }

    setPaymentInfo((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Ne rien rendre côté serveur
  if (!mounted) {
    return null
  }

  // Afficher la page de confirmation si la commande est terminée
  if (orderComplete) {
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

        <main className="flex-1 py-12">
          <div className="container max-w-3xl px-4 md:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Commande confirmée</h1>
              <p className="text-muted-foreground">
                Merci pour votre commande ! Votre numéro de commande est{" "}
                <strong>#BH{Math.floor(Math.random() * 10000)}</strong>
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="font-medium mb-4">Détails de la commande</h2>
              <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Nom</div>
                  <div>
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Email</div>
                  <div>{shippingInfo.email}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Adresse de livraison</div>
                  <div>
                    {shippingInfo.address}, {shippingInfo.postalCode} {shippingInfo.city}, {shippingInfo.country}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Méthode de livraison</div>
                  <div>
                    {shippingMethod === "standard" ? "Standard (3-5 jours ouvrés)" : "Express (1-2 jours ouvrés)"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Total</div>
                  <div className="font-medium">{total.toFixed(2)} €</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Vous recevrez un email de confirmation à {shippingInfo.email} avec les détails de votre commande. Si
                vous avez des questions, n'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Retour à l'accueil</Button>
                </Link>
                <Link href="/products">
                  <Button>Continuer mes achats</Button>
                </Link>
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
            <Link href="/cart" className="flex items-center text-sm hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour au panier
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-8">Finaliser votre commande</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Formulaire de paiement */}
            <div className="md:col-span-2">
              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger
                    value="shipping"
                    onClick={() => setActiveStep("shipping")}
                    disabled={activeStep === "review"}
                  >
                    Livraison
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    onClick={() => (activeStep === "review" ? setActiveStep("payment") : null)}
                    disabled={activeStep === "shipping"}
                  >
                    Paiement
                  </TabsTrigger>
                  <TabsTrigger value="review" disabled={activeStep !== "review"}>
                    Vérification
                  </TabsTrigger>
                </TabsList>

                {/* Étape 1: Informations de livraison */}
                <TabsContent value="shipping" className="space-y-6">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className={formErrors.firstName ? "border-red-500" : ""}
                        />
                        {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className={formErrors.lastName ? "border-red-500" : ""}
                        />
                        {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          className={formErrors.email ? "border-red-500" : ""}
                        />
                        {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          className={formErrors.phone ? "border-red-500" : ""}
                        />
                        {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className={formErrors.address ? "border-red-500" : ""}
                      />
                      {formErrors.address && <p className="text-xs text-red-500">{formErrors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className={formErrors.city ? "border-red-500" : ""}
                        />
                        {formErrors.city && <p className="text-xs text-red-500">{formErrors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingChange}
                          className={formErrors.postalCode ? "border-red-500" : ""}
                        />
                        {formErrors.postalCode && <p className="text-xs text-red-500">{formErrors.postalCode}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Select
                        value={shippingInfo.country}
                        onValueChange={(value) => setShippingInfo((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Belgique">Belgique</SelectItem>
                          <SelectItem value="Suisse">Suisse</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Méthode de livraison</h3>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <div>
                              <div>Livraison standard</div>
                              <div className="text-sm text-muted-foreground">3-5 jours ouvrés</div>
                            </div>
                          </Label>
                        </div>
                        <div className="font-medium">
                          {subtotal > 50 ? <span className="text-green-600">Gratuit</span> : "4,99 €"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <div>
                              <div>Livraison express</div>
                              <div className="text-sm text-muted-foreground">1-2 jours ouvrés</div>
                            </div>
                          </Label>
                        </div>
                        <div className="font-medium">{subtotal > 50 ? "4,99 €" : "9,99 €"}</div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="pt-6">
                    <Button onClick={handleNextStep} className="w-full">
                      Continuer vers le paiement
                    </Button>
                  </div>
                </TabsContent>

                {/* Étape 2: Informations de paiement */}
                <TabsContent value="payment" className="space-y-6">
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Paiement sécurisé</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Toutes vos informations de paiement sont cryptées et sécurisées. Nous ne stockons pas vos données
                      de carte.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          className={`pl-10 ${formErrors.cardNumber ? "border-red-500" : ""}`}
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      {formErrors.cardNumber && <p className="text-xs text-red-500">{formErrors.cardNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="J. DUPONT"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className={formErrors.cardName ? "border-red-500" : ""}
                      />
                      {formErrors.cardName && <p className="text-xs text-red-500">{formErrors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          className={formErrors.expiryDate ? "border-red-500" : ""}
                        />
                        {formErrors.expiryDate && <p className="text-xs text-red-500">{formErrors.expiryDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">Code de sécurité (CVV)</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          className={formErrors.cvv ? "border-red-500" : ""}
                        />
                        {formErrors.cvv && <p className="text-xs text-red-500">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="save-card" />
                    <label
                      htmlFor="save-card"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sauvegarder cette carte pour mes prochains achats
                    </label>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => setActiveStep("shipping")} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Continuer
                    </Button>
                  </div>
                </TabsContent>

                {/* Étape 3: Vérification de la commande */}
                <TabsContent value="review" className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Adresse de livraison</h3>
                      <div className="rounded-lg border p-4">
                        <p className="font-medium">
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        <p>
                          {shippingInfo.postalCode} {shippingInfo.city}
                        </p>
                        <p>{shippingInfo.country}</p>
                        <p className="mt-2">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                      <Button variant="link" className="px-0 h-auto" onClick={() => setActiveStep("shipping")}>
                        Modifier
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Méthode de livraison</h3>
                      <div className="rounded-lg border p-4">
                        <p>
                          {shippingMethod === "standard"
                            ? "Livraison standard (3-5 jours ouvrés)"
                            : "Livraison express (1-2 jours ouvrés)"}
                        </p>
                      </div>
                      <Button variant="link" className="px-0 h-auto" onClick={() => setActiveStep("shipping")}>
                        Modifier
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Méthode de paiement</h3>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Carte se terminant par {paymentInfo.cardNumber.slice(-4)}</span>
                        </div>
                      </div>
                      <Button variant="link" className="px-0 h-auto" onClick={() => setActiveStep("payment")}>
                        Modifier
                      </Button>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="items">
                        <AccordionTrigger>Articles ({items.length})</AccordionTrigger>
                        <AccordionContent>
                          <ul className="divide-y">
                            {items.map((item) => (
                              <li key={item.product.id} className="py-2 flex gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                  <Image
                                    src={item.product.images[0] || "/placeholder.svg"}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col">
                                  <span className="font-medium">{item.product.name}</span>
                                  <span className="text-sm text-muted-foreground">Quantité: {item.quantity}</span>
                                  <span className="text-sm">{(item.product.price * item.quantity).toFixed(2)} €</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => setActiveStep("payment")} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={handlePlaceOrder} className="flex-1" disabled={isProcessing}>
                      {isProcessing ? "Traitement en cours..." : "Passer la commande"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Récapitulatif de la commande */}
            <div>
              <div className="rounded-lg border overflow-hidden sticky top-6">
                <div className="bg-muted px-4 py-3 font-medium">Récapitulatif de la commande</div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span>{taxAmount.toFixed(2)} €</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {shippingMethod === "standard"
                          ? "Livraison standard (3-5 jours ouvrés)"
                          : "Livraison express (1-2 jours ouvrés)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span>14 jours pour changer d'avis</span>
                    </div>
                  </div>
                </div>
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
