import type { CheckoutCardProps } from "./ThriftHappens";

export default function CheckoutCard({
  product,
  subtotal,
  handleRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div className="checkoutCard">
      <img src={product.image} alt={product.name} width={150} />

      <h3>{product.name}</h3>

      <p>Unit Price: ${product.price.toFixed(2)}</p>
      <p>Quantity: {product.itemQuantity}</p>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>

      <button onClick={() => handleRemoveFromCheckout(product.id)}>
        Remove
      </button>
    </div>
  );
}
