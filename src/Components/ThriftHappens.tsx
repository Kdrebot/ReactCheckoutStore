import { useState } from "react";
import { products } from "../Data/data";
import type { ClothingProduct } from "../Data/data";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

// Interfaces_-_-_-_-_-_-_-_-_-_-_

export interface ItemCardProps {
  product: ClothingProduct;
  selectedQuantity: number;
  isOutOfStock: boolean;
  handleIncreaseQuantity: (id: number) => void;
  handleDecreaseQuantity: (id: number) => void;
  handleAddToCheckout: (id: number) => void;
}

export interface ItemsContainerProps {
  products: ClothingProduct[];
  selectedQuantities: number[];
  handleIncreaseQuantity: (id: number) => void;
  handleDecreaseQuantity: (id: number) => void;
  handleAddToCheckout: (id: number) => void;
}

export interface CheckoutCardProps {
  product: ClothingProduct;
  subtotal: number;
  handleRemoveFromCheckout: (id: number) => void;
}

export interface CheckoutContainerProps {
  checkout: ClothingProduct[];
  total: number;
  handleRemoveFromCheckout: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export default function ThriftHappens() {
  // States_-_-_-_-_-_-_-_-_-_-_

  const [inventory, setInventory] = useState<ClothingProduct[]>(() =>
    products.map((product) => ({ ...product })),
  );

  const [checkout, setCheckout] = useState<ClothingProduct[]>([]);

  const [selectedQuantities, setSelectedQuantities] = useState<number[]>(
    products.map(() => 0),
  );

  // Handlers_-_-_-_-_-_-_-_-_-_-_

  // 1. Increase selected quantity
  const handleIncreaseQuantity = (id: number) => {
    const product = inventory.find((product) => product.id === id);

    if (!product) return;

    if (selectedQuantities[id] < product.quantity) {
      setSelectedQuantities((previous) =>
        previous.map((quantity, index) =>
          index === id ? quantity + 1 : quantity,
        ),
      );
    }
  };

  // 2. Decrease selected quantity
  const handleDecreaseQuantity = (id: number) => {
    if (selectedQuantities[id] > 0) {
      setSelectedQuantities((previous) =>
        previous.map((quantity, index) =>
          index === id ? quantity - 1 : quantity,
        ),
      );
    }
  };

  // 3. Add product to checkout
  const handleAddToCheckout = (id: number) => {
    const product = inventory.find((product) => product.id === id);
    const amount = selectedQuantities[id];

    if (!product || amount <= 0 || amount > product.quantity) {
      return;
    }

    // Decrease available inventory
    setInventory((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - amount } : item,
      ),
    );

    // Check whether product is already in checkout
    const existingProduct = checkout.find((item) => item.id === id);

    if (existingProduct) {
      setCheckout((previous) =>
        previous.map((item) =>
          item.id === id
            ? {
                ...item,
                itemQuantity: item.itemQuantity + amount,
              }
            : item,
        ),
      );
    } else {
      setCheckout((previous) => [
        ...previous,
        { ...product, itemQuantity: amount },
      ]);
    }

    // Reset selected quantity to zero
    setSelectedQuantities((previous) =>
      previous.map((quantity, index) => (index === id ? 0 : quantity)),
    );
  };

  // 4. Remove product from checkout
  const handleRemoveFromCheckout = (id: number) => {
    const removedProduct = checkout.find((product) => product.id === id);

    if (!removedProduct) return;

    // Restore available stock
    setInventory((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + removedProduct.itemQuantity,
            }
          : product,
      ),
    );

    // Remove product from checkout
    setCheckout((previous) => previous.filter((product) => product.id !== id));
  };

  // 5. Empty checkout
  const handleEmptyCheckout = () => {
    setInventory((previous) =>
      previous.map((product) => {
        const checkoutProduct = checkout.find((item) => item.id === product.id);

        if (checkoutProduct) {
          return {
            ...product,
            quantity: product.quantity + checkoutProduct.itemQuantity,
          };
        }

        return product;
      }),
    );

    setCheckout([]);
  };

  // Calculations_-_-_-_-_-_-_-_-_-_-_

  const total = checkout.reduce(
    (sum, product) => sum + product.price * product.itemQuantity,
    0,
  );

  // Main Return_-_-_-_-_-_-_-_-_-_-_

  return (
    <div className="thriftHappens">
      <ItemsContainer
        products={inventory}
        selectedQuantities={selectedQuantities}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleAddToCheckout={handleAddToCheckout}
      />

      <CheckoutContainer
        checkout={checkout}
        total={total}
        handleRemoveFromCheckout={handleRemoveFromCheckout}
        handleEmptyCheckout={handleEmptyCheckout}
      />
    </div>
  );
}
