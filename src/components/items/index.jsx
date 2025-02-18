import { useEffect, useState, useContext } from "react";
import { Context } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const Items = () => {
  const { cart, setCart, loged, searchTerm } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["all", ...data]))
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "https://fakestoreapi.com/products";
    if (selectedCategory !== "all") {
      url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    if (!loged) {
      navigate("/login")
     return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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

  if (isLoading)
    return (
      <div className="loading">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <>
      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category}
            className={category === selectedCategory ? "active" : ""}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="items-container">
        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">${product.price}</p>
                  </Link>
                  {cartItem ? (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(product.id)}>
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      🛒 add to cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Items;
