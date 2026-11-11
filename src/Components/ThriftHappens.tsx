import { useState } from "react";
import { products } from "../Data/data";
import type { ClothingProduct } from "../Data/data";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

export default function ThriftHappens() {
  const [inventory, setInventory] = useState<ClothingProduct[]>(() =>
    products.map((product) => ({ ...product })),
  );

  const [checkout, setCheckout] = useState<ClothingProduct[]>([]);

  //handlers
  function handleAddToCheckout(id: number, amount: number) {
    // Find the product in inventory
    const selectedProduct = inventory.find((product) => product.id === id);

    // Validate the selected quantity before updating state
    if (
      !selectedProduct ||
      !Number.isInteger(amount) ||
      amount <= 0 ||
      amount > selectedProduct.quantity
    ) {
      return;
    }

    // Decrease available inventory
    setInventory((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity - amount,
            }
          : product,
      ),
    );

    // Add a new checkout entry or increase an existing one
    setCheckout((previous) => {
      const existingProduct = previous.find((product) => product.id === id);

      if (existingProduct) {
        return previous.map((product) =>
          product.id === id
            ? {
                ...product,
                itemQuantity: product.itemQuantity + amount,
              }
            : product,
        );
      }

      return [
        ...previous,
        {
          ...selectedProduct,
          itemQuantity: amount,
        },
      ];
    });
  }
  return (
    <div className="thriftHappens">
      <ItemsContainer
        products={inventory}
        onAddToCheckout={handleAddToCheckout}
      />

      <CheckoutContainer checkout={checkout} />
    </div>
  );
}
