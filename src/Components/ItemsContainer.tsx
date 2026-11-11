import ItemCard from "./ItemCard";
import type { ClothingProduct } from "../Data/data";

interface ItemsContainerProps {
  products: ClothingProduct[];
  onAddToCheckout: (id: number, amount: number) => void;
}

export default function ItemsContainer({
  products,
  onAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          onAddToCheckout={onAddToCheckout}
        />
      ))}
    </div>
  );
}
