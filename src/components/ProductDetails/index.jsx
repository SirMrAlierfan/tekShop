import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";


const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(Context);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const cartItem = cart.find((item) => item.id === Number(id));

  const addToCart = () => {
    if (!cartItem) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = () => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = () => {
    if (cartItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
      {cartItem ? (
        <div className="quantity-controls">
          <button onClick={decreaseQuantity}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
      ) : (
        <button className="add-to-cart-btn" onClick={addToCart}>
          🛒 ADD TO CART
        </button>
      )}
 
    </div>
  );
};

export default ProductDetails;
