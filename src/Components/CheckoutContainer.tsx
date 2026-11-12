import CheckoutCard from "./CheckoutCard";
import type { CheckoutContainerProps } from "./ThriftHappens";

export default function CheckoutContainer({
  checkout,
  total,
  handleRemoveFromCheckout,
  handleEmptyCheckout,
}: CheckoutContainerProps) {
  return (
    <div className="checkoutContainer">
      <h2>Checkout</h2>

      {checkout.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        checkout.map((product) => (
          <CheckoutCard
            key={product.id}
            product={product}
            subtotal={product.price * product.itemQuantity}
            handleRemoveFromCheckout={handleRemoveFromCheckout}
          />
        ))
      )}

      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={handleEmptyCheckout} disabled={checkout.length === 0}>
        Empty Checkout
      </button>
    </div>
  );
}
