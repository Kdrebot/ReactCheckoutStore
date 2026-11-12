import ItemCard from "./ItemCard";
import type { ItemsContainerProps } from "./ThriftHappens";

export default function ItemsContainer({
  products,
  selectedQuantities,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          selectedQuantity={selectedQuantities[product.id]}
          isOutOfStock={product.quantity === 0}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleAddToCheckout={handleAddToCheckout}
        />
      ))}
    </div>
  );
}
