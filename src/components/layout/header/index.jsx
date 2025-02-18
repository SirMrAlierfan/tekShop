import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../App";
import "./header.module.css";

const Header = () => {
  const { UserName, cart, searchTerm, setSearchTerm } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSeeProfile = () => {
    navigate("/profile");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVCvzZl50hV185ciTWG1yequccaNtQ0cbYQ&s"
          alt="logo"
          width="80px"
        />
        <ul>
          <a href="#">about us</a>
          <a href="#">contact</a>
          <Link to="/cart" className="cart-icon">
            {cart.length > 0 && (
              <span className="cart-counter">{cart.length}</span>
            )}
            : 🛒your cart
          </Link>
        </ul>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {UserName === "" ? (
          <button onClick={handleLogin}>sign in / sign up</button>
        ) : (
          <button onClick={handleSeeProfile}>{UserName}</button>
        )}
      </header>
      <hr />
    </>
  );
};

export default Header;
