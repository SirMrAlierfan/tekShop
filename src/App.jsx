import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Layout from "./components/layout";
import Login from "./components/layout/header/login";
import Items from "./components/items";
import ProfilePage from "./components/profile";
import ProductDetails from "./components/productDetails";
import Cart from "./components/cart/INDEX.JSX";


export const Context = createContext();

const App = () => {
  const [loged, setloged] = useState(false);
  const [UserName, SetUserNameP] = useState("");
  const [profileInfo, setProfileInfo] = useState({
    UserName: "",
    email: "",
    age: "",
    city: "",
  });
  const [cart, setCart] = useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setloged(true);
      SetUserNameP(user.username);
      setProfileInfo(user.profileInfo);
    }
  }, []);

  useEffect(() => {
    if (loged) {
      const user = { username: UserName, profileInfo: profileInfo };
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [loged, UserName, profileInfo]);

  const handleLogout = () => {
    setloged(false);
    SetUserNameP("");
    setProfileInfo({ UserName: "", email: "", age: "", city: "" });
    localStorage.removeItem("user");
  };

  return (
    <Context.Provider
      value={{
        loged,
        setloged,
        UserName,
        SetUserNameP,
        profileInfo,
        setProfileInfo,
        cart,
        setCart,
        searchTerm, 
        setSearchTerm,  
        handleLogout
      }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
