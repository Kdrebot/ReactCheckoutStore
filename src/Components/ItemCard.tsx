import type { ItemCardProps } from "./ThriftHappens";

export default function ItemCard({
  product,
  selectedQuantity,
  isOutOfStock,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleAddToCheckout,
}: ItemCardProps) {
  return (
    <div className="itemCard">
      <img src={product.image} alt={product.name} width={150} />

      <h3>{product.name}</h3>
      <p>Fit: {product.fit}</p>
      <p>Category: {product.category}</p>
      <p>Colour: {product.color}</p>
      <p>Description: {product.description}</p>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price.toFixed(2)}</p>

      <p>{isOutOfStock ? "Out of Stock" : `Stock: ${product.quantity}`}</p>

      <div className="quantityCounter">
        <button
          onClick={() => handleDecreaseQuantity(product.id)}
          disabled={selectedQuantity === 0}
        >
          -
        </button>

        <span>{selectedQuantity}</span>

        <button
          onClick={() => handleIncreaseQuantity(product.id)}
          disabled={isOutOfStock || selectedQuantity >= product.quantity}
        >
          +
        </button>
      </div>

      <button
        onClick={() => handleAddToCheckout(product.id)}
        disabled={
          isOutOfStock ||
          selectedQuantity === 0 ||
          selectedQuantity > product.quantity
        }
      >
        Add to Checkout
      </button>
    </div>
  );
}
