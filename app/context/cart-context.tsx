"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/data/products"

// Type pour les éléments du panier
export interface CartItem {
  product: Product
  quantity: number
}

// Interface du contexte du panier
interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

// Création du contexte avec des valeurs par défaut
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
})

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => useContext(CartContext)

// Clé pour le stockage local
const CART_STORAGE_KEY = "beautehub-cart"

// Fournisseur du contexte du panier
export function CartProvider({ children }: { children: ReactNode }) {
  // État du panier
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Charger le panier depuis le stockage local au chargement initial
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // Sauvegarder le panier dans le stockage local à chaque modification
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  // Ajouter un produit au panier
  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        // Mettre à jour la quantité si le produit existe déjà
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        // Ajouter un nouveau produit
        return [...prevItems, { product, quantity }]
      }
    })
  }

  // Supprimer un produit du panier
  const removeItem = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // Vider le panier
  const clearCart = () => {
    setItems([])
  }

  // Calculer le nombre total d'articles
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculer le sous-total
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Valeur du contexte
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
