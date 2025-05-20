import { NextResponse } from "next/server"

// Base de données fictive (identique à celle de la route principale des produits)
let products = [
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

// GET un produit par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Trouver le produit par ID
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 })
  }

  return NextResponse.json(product)
}

// PUT (mise à jour) d'un produit
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Trouver l'index du produit
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 })
    }

    // Mettre à jour le produit
    const updatedProduct = {
      ...products[index],
      ...body,
      id, // S'assurer que l'ID ne change pas
      price: body.price ? Number.parseFloat(body.price) : products[index].price,
      stock: body.stock !== undefined ? body.stock : products[index].stock,
    }

    products[index] = updatedProduct

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 })
  }
}

// DELETE un produit
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Trouver l'index du produit
  const index = products.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 })
  }

  // Supprimer le produit
  const deletedProduct = products[index]
  products = products.filter((p) => p.id !== id)

  return NextResponse.json(deletedProduct)
}
