import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { useContext } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert(`  you payed : $${totalAmount.toFixed(2)}`);
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h1>your cart</h1>
      {cart.length === 0 ? (
        <p>your cart is empty</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} width="80" />
              <div>
                <h3>{product.title}</h3>
                <p>price ${product.price.toFixed(2)}</p>
                <div className="quantity-controls-forCart">
                  <button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>
                <button className="checkout-btn" onClick={() => handleRemove(product.id)}>❌ del</button>
              </div>
            </div>
          ))}
          <h2> cost: ${totalAmount.toFixed(2)}</h2>
          <button className="checkout-btn" onClick={handleCheckout}>
            💳 pay
          </button>
        </div>
      )}
      <button className=".add-to-cart-btn" onClick={() => navigate("/")}>
        🛍 keep shoping
      </button>
    </div>
  );
};

export default Cart;
