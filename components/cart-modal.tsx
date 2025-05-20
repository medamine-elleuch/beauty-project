"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart, type CartItem } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export function CartModal() {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ne rien rendre côté serveur
  if (!isMounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Panier">
        <ShoppingBag className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Panier"
        >
          <ShoppingBag className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="px-1">
          <SheetTitle>Votre Panier ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">
                Votre panier est vide
              </h3>
              <p className="text-muted-foreground mb-4">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <SheetClose asChild>
                <Link href="/products">
                  <Button>Voir les produits</Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.product.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Sous-total:</span>
              <span className="font-bold">{subtotal.toFixed(2)} €</span>
            </div>
            <div className="space-y-2">
              <SheetClose asChild>
                <Link href="/cart">
                  <Button className="w-full">Voir le panier</Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/checkout">
                  <Button className="w-full" variant="secondary">
                    Passer à la caisse
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Composant pour afficher un élément du panier
function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <li className="flex gap-4 py-2">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link
            href={`/products/${product.id}`}
            className="font-medium hover:underline"
          >
            {product.name}
          </Link>
          <button
            onClick={() => removeItem(product.id)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Supprimer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-muted-foreground">
          {product.price.toFixed(2)} €
        </span>
        <div className="mt-1 flex items-center">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1 hover:bg-muted"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 text-sm">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1 hover:bg-muted"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="ml-auto font-medium">
            {(product.price * quantity).toFixed(2)} €
          </span>
        </div>
      </div>
    </li>
  );
}
