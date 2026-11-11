import CheckoutCard from "./CheckoutCard";
import type { ClothingProduct } from "../Data/data";

interface CheckoutContainerProps {
  checkout: ClothingProduct[];
}

export default function CheckoutContainer({
  checkout,
}: CheckoutContainerProps) {
  const CheckoutTotal = checkout.reduce((total, product) => {
    return total + product.price * product.itemQuantity;
  }, 0);

  return (
    <div className="checkoutContainer">
      <h2>Checkout</h2>

      {checkout.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        checkout.map((product) => (
          <CheckoutCard key={product.id} product={product} />
        ))
      )}

      <h3>Total: ${CheckoutTotal.toFixed(2)}</h3>
    </div>
  );
}
