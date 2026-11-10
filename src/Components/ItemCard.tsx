import { useState } from "react";
import type { ClothingProduct } from "../Data/data";

interface ItemCardProps {
  product: ClothingProduct;
}

export default function ItemCard({ product }: ItemCardProps) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  //handlers
  function handleIncreaseQuantity() {
    setSelectedQuantity((previous) => Math.min(product.quantity, previous + 1));
  }

  function handleDecreaseQuantity() {
    setSelectedQuantity((previous) => Math.max(0, previous - 1));
  }

  function handleOutOfStock(): boolean {
    return product.quantity === 0;
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
      </div>
    </div>
  );
}
