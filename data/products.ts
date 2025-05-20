// Ajoutons quelques produits supplémentaires pour avoir une meilleure expérience de pagination et filtrage

export interface Product {
  id: number
  name: string
  price: number
  description: string
  features: string[]
  rating: number
  reviews: number
  category: string
  images: string[]
  stock: number
  isNew?: boolean
  isBestseller?: boolean
}

// Données des produits
export const products: Product[] = [
  {
    id: 1,
    name: "Sérum Hydratant Intense",
    price: 29.99,
    description:
      "Ce sérum hydratant intense est formulé avec de l'acide hyaluronique et des extraits de plantes biologiques pour hydrater profondément votre peau et lui donner un éclat naturel.",
    features: [
      "Hydratation intense pendant 24 heures",
      "Formule non grasse qui pénètre rapidement",
      "Convient à tous les types de peau",
      "Sans parabènes ni sulfates",
    ],
    rating: 4.8,
    reviews: 124,
    category: "skincare",
    images: ["/placeholder.svg?height=600&width=600&text=Sérum+Hydratant"],
    stock: 15,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Crème Anti-âge Régénérante",
    price: 49.99,
    description:
      "Notre crème anti-âge régénérante est enrichie en peptides et en vitamines pour réduire visiblement les rides et les ridules tout en améliorant l'élasticité de la peau.",
    features: [
      "Réduit l'apparence des rides fines",
      "Améliore l'élasticité et la fermeté",
      "Formule riche en antioxydants",
      "Utilisation quotidienne matin et soir",
    ],
    rating: 4.6,
    reviews: 89,
    category: "skincare",
    images: ["/placeholder.svg?height=600&width=600&text=Crème+Anti-âge"],
    stock: 8,
    isNew: true,
  },
  {
    id: 3,
    name: "Masque Purifiant à l'Argile",
    price: 19.99,
    description:
      "Ce masque purifiant à l'argile verte absorbe l'excès de sébum, élimine les impuretés et resserre les pores pour une peau nette et éclatante.",
    features: [
      "Purifie et détoxifie la peau",
      "Réduit l'apparence des pores",
      "Idéal pour les peaux mixtes à grasses",
      "Utilisation 1-2 fois par semaine",
    ],
    rating: 4.5,
    reviews: 76,
    category: "skincare",
    images: ["/placeholder.svg?height=600&width=600&text=Masque+Purifiant"],
    stock: 22,
  },
  {
    id: 4,
    name: "Huile Capillaire Nourrissante",
    price: 24.99,
    description:
      "Notre huile capillaire nourrissante est un traitement intensif qui répare, renforce et fait briller les cheveux secs et abîmés.",
    features: [
      "Répare les pointes fourchues",
      "Nourrit en profondeur",
      "Sans silicones ni huiles minérales",
      "Parfum naturel d'huiles essentielles",
    ],
    rating: 4.7,
    reviews: 103,
    category: "haircare",
    images: ["/placeholder.svg?height=600&width=600&text=Huile+Capillaire"],
    stock: 18,
    isBestseller: true,
  },
  {
    id: 5,
    name: "Rouge à Lèvres Hydratant",
    price: 18.99,
    description:
      "Ce rouge à lèvres offre une couleur intense et une hydratation durable. Sa formule enrichie en beurre de karité et en vitamine E nourrit vos lèvres tout au long de la journée.",
    features: [
      "Couleur intense et longue tenue",
      "Formule hydratante et nourrissante",
      "Fini satiné élégant",
      "Sans tests sur les animaux",
    ],
    rating: 4.4,
    reviews: 67,
    category: "makeup",
    images: ["/placeholder.svg?height=600&width=600&text=Rouge+à+Lèvres"],
    stock: 25,
  },
  {
    id: 6,
    name: "Fond de Teint Naturel",
    price: 32.99,
    description:
      "Notre fond de teint offre une couvrance modulable et un fini naturel. Sa formule légère laisse respirer la peau tout en unifiant le teint et en masquant les imperfections.",
    features: [
      "Couvrance modulable (légère à moyenne)",
      "Fini naturel non-comédogène",
      "Enrichi en antioxydants",
      "Disponible en 20 teintes",
    ],
    rating: 4.9,
    reviews: 142,
    category: "makeup",
    images: ["/placeholder.svg?height=600&width=600&text=Fond+de+Teint"],
    stock: 12,
    isBestseller: true,
  },
  {
    id: 7,
    name: "Shampooing Réparateur",
    price: 15.99,
    description:
      "Ce shampooing réparateur est spécialement formulé pour les cheveux abîmés et fragilisés. Il nettoie en douceur tout en réparant la fibre capillaire de l'intérieur.",
    features: [
      "Répare les cheveux abîmés",
      "Renforce la fibre capillaire",
      "Sans sulfates ni silicones",
      "Parfum délicat de fleurs blanches",
    ],
    rating: 4.3,
    reviews: 58,
    category: "haircare",
    images: ["/placeholder.svg?height=600&width=600&text=Shampooing+Réparateur"],
    stock: 30,
  },
  {
    id: 8,
    name: "Palette de Fards à Paupières",
    price: 39.99,
    description:
      "Cette palette de fards à paupières contient 12 teintes hautement pigmentées allant des neutres aux plus audacieuses pour créer une multitude de looks.",
    features: ["12 teintes complémentaires", "Haute pigmentation", "Formule longue tenue", "Miroir intégré"],
    rating: 4.7,
    reviews: 91,
    category: "makeup",
    images: ["/placeholder.svg?height=600&width=600&text=Palette+Fards"],
    stock: 7,
    isNew: true,
  },
  {
    id: 9,
    name: "Crème Solaire Invisible SPF 50",
    price: 22.99,
    description:
      "Notre crème solaire offre une protection élevée contre les UVA et UVB tout en restant invisible sur la peau. Sa formule légère ne laisse pas de traces blanches et convient à tous les types de peau.",
    features: [
      "Protection SPF 50 UVA/UVB",
      "Formule invisible sans traces blanches",
      "Résistante à l'eau (40 minutes)",
      "Convient aux peaux sensibles",
    ],
    rating: 4.8,
    reviews: 113,
    category: "skincare",
    images: ["/placeholder.svg?height=600&width=600&text=Crème+Solaire"],
    stock: 20,
  },
  {
    id: 10,
    name: "Masque Capillaire Intensif",
    price: 27.99,
    description:
      "Ce masque capillaire intensif transforme les cheveux secs et ternes en une chevelure douce et brillante en seulement 5 minutes. Idéal pour une utilisation hebdomadaire.",
    features: [
      "Hydratation intense en 5 minutes",
      "Répare les cheveux très abîmés",
      "Enrichi en huiles précieuses",
      "Sans parabènes ni silicones",
    ],
    rating: 4.6,
    reviews: 79,
    category: "haircare",
    images: ["/placeholder.svg?height=600&width=600&text=Masque+Capillaire"],
    stock: 15,
  },
  {
    id: 11,
    name: "Eyeliner Précision",
    price: 16.99,
    description:
      "Notre eyeliner à pointe fine permet un tracé précis et intense. Sa formule waterproof assure une tenue toute la journée sans bavures ni transferts.",
    features: [
      "Pointe fine pour une application précise",
      "Formule waterproof longue tenue",
      "Noir intense",
      "Sans cruauté",
    ],
    rating: 4.5,
    reviews: 86,
    category: "makeup",
    images: ["/placeholder.svg?height=600&width=600&text=Eyeliner"],
    stock: 22,
  },
  {
    id: 12,
    name: "Gommage Visage Éclat",
    price: 23.99,
    description:
      "Ce gommage visage élimine en douceur les cellules mortes et les impuretés pour révéler une peau plus lisse et éclatante. Enrichi en acides de fruits pour un effet exfoliant optimal.",
    features: [
      "Exfoliation douce et efficace",
      "Texture gel avec particules fines",
      "Enrichi en AHA naturels",
      "Convient aux peaux normales à mixtes",
    ],
    rating: 4.4,
    reviews: 64,
    category: "skincare",
    images: ["/placeholder.svg?height=600&width=600&text=Gommage+Visage"],
    stock: 18,
    isNew: true,
  },
]

// Fonction pour obtenir un produit par son ID
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

// Fonction pour obtenir des produits par catégorie
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

// Fonction pour obtenir les produits en vedette
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isBestseller || product.isNew)
}

// Fonction pour obtenir tous les produits
export function getProducts(): Product[] {
  return products
}
