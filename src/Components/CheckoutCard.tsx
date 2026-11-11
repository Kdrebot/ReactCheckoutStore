import type { ClothingProduct } from "../Data/data";

interface CheckoutCardProps {
  product: ClothingProduct;
}

export default function CheckoutCard({ product }: CheckoutCardProps) {
  return (
    <div className="checkoutCard">
      <img src={product.image} alt={product.name} height={150} />
      <h3>{product.name}</h3>
      <p>Unit Price: ${product.price.toFixed(2)}</p>
      <p>Quantity: {product.itemQuantity}</p>
      <p>Subtotal: ${(product.price * product.itemQuantity).toFixed(2)}</p>
    </div>
  );
}
