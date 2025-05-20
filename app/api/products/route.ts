import { NextResponse } from "next/server"

// Base de données fictive
const products = [
  {
    id: 1,
    name: "Crème Hydratante Visage",
    description: "Une crème riche et hydratante qui nourrit et hydrate la peau.",
    category: "Soins de la Peau",
    price: 29.99,
    stock: 45,
    image: "/placeholder.svg?height=400&width=400&text=Produit+1",
  },
  {
    id: 2,
    name: "Mascara Volumisant",
    description: "Ajoute du volume et de la longueur à vos cils pour un look spectaculaire.",
    category: "Maquillage",
    price: 19.99,
    stock: 32,
    image: "/placeholder.svg?height=400&width=400&text=Produit+2",
  },
  {
    id: 3,
    name: "Shampooing Nourrissant",
    description: "Nettoie et nourrit les cheveux, les laissant doux et faciles à coiffer.",
    category: "Soins Capillaires",
    price: 24.99,
    stock: 28,
    image: "/placeholder.svg?height=400&width=400&text=Produit+3",
  },
  {
    id: 4,
    name: "Sérum Anti-Âge",
    description: "Réduit l'apparence des ridules et des rides pour une peau d'apparence plus jeune.",
    category: "Soins de la Peau",
    price: 49.99,
    stock: 15,
    image: "/placeholder.svg?height=400&width=400&text=Produit+4",
  },
  {
    id: 5,
    name: "Rouge à Lèvres Mat",
    description: "Rouge à lèvres longue tenue qui n'assèche pas vos lèvres.",
    category: "Maquillage",
    price: 22.99,
    stock: 37,
    image: "/placeholder.svg?height=400&width=400&text=Produit+5",
  },
]

// GET tous les produits
export async function GET(request: Request) {
  // Récupération des paramètres de requête
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  // Filtrer les produits si une catégorie est fournie
  let filteredProducts = products
  if (category) {
    filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json(filteredProducts)
}

// POST un nouveau produit
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Valider les champs requis
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }

    // Créer un nouveau produit
    const newProduct = {
      id: products.length + 1,
      name: body.name,
      description: body.description || "",
      category: body.category,
      price: Number.parseFloat(body.price),
      stock: body.stock || 0,
      image: body.image || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(body.name)}`,
    }

    // Ajouter au tableau de produits
    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 })
  }
}
