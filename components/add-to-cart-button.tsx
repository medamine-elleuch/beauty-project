"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/app/context/cart-context";
import type { Product } from "@/data/products";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
  showQuantity?: boolean;
}

export function AddToCartButton({
  product,
  quantity = 1,
  showQuantity = false,
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleAddToCart = () => {
    addItem(product, itemQuantity);
    setIsAdded(true);

    // Réinitialiser l'état après 2 secondes
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {showQuantity && (
        <div className="flex items-center border rounded-md">
          <button
            type="button"
            onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
            className="p-1 hover:bg-muted"
            aria-label="Diminuer la quantité"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <span className="px-2 text-sm">{itemQuantity}</span>
          <button
            type="button"
            onClick={() => setItemQuantity(itemQuantity + 1)}
            className="p-1 hover:bg-muted"
            aria-label="Augmenter la quantité"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      )}
      <Button
        onClick={handleAddToCart}
        disabled={isAdded || product.stock === 0}
        {...props}
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Ajouté
          </>
        ) : product.stock === 0 ? (
          "Rupture de stock"
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </>
        )}
      </Button>
    </div>
  );
}
