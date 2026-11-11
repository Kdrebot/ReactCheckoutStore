import { useState } from "react";
import type { ClothingProduct } from "../Data/data";

interface ItemCardProps {
  product: ClothingProduct;
  onAddToCheckout: (id: number, amount: number) => void;
}

export default function ItemCard({ product, onAddToCheckout }: ItemCardProps) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  //handlers

  //add one to the selected quantity cant go above the max stock price
  function handleIncreaseQuantity() {
    setSelectedQuantity((previous) => Math.min(product.quantity, previous + 1));
  }

  //remove 1 from the selected quantity cant go below 0
  function handleDecreaseQuantity() {
    setSelectedQuantity((previous) => Math.max(0, previous - 1));
  }
  //checks to see if the stock is 0 and if it is return true
  function handleOutOfStock(): boolean {
    return product.quantity === 0;
  }

  function handleAddClick() {
    if (selectedQuantity <= 0 || selectedQuantity > product.quantity) {
      return;
    }

    onAddToCheckout(product.id, selectedQuantity);
    setSelectedQuantity(0);
  }

  //main return
  return (
    <div className="itemCard">
      <img src={product.image} alt="" height="150px" />
      <h3>{product.name}</h3>
      <p>Fit: {product.fit}</p>
      <p>Category: {product.category}</p>
      <p>Colour: {product.color}</p>
      <p>Description: {product.description}</p>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>
        {handleOutOfStock() ? "Out Of Stock" : `Stock: ${product.quantity}`}
      </p>
      <div className="quantityCounter">
        <button onClick={handleDecreaseQuantity} disabled={handleOutOfStock()}>
          -
        </button>
        <span>{selectedQuantity}</span>
        <button onClick={handleIncreaseQuantity} disabled={handleOutOfStock()}>
          +
        </button>
        <button
          onClick={handleAddClick}
          disabled={
            selectedQuantity === 0 ||
            selectedQuantity > product.quantity ||
            product.quantity === 0
          }
        >
          Add to Checkout
        </button>
      </div>
    </div>
  );
}
