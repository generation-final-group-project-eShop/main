import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Page/Header.js";
import Footer from "./Page/Footer.js";
import Home from "./Page/Home.js";
import ProductPage from "./Page/ProductPage.js";
import Checkout from "./Page/Checkout.js";
import Signin from "./Page/Signin.js";
import CategoriesPage from "./Page/Component/categoriesPage.js";
import SmallCategoriesPage from "./Page/Component/smallCategoriesPage.js";
import ScrollButton from "./Page/Component/ScrollBtn.js";
import LoadingSpinner from "./Page/Component/LoadingSpinner.js"

let savedCart = JSON.parse(localStorage.getItem("Cart"));
let SaveCart = savedCart;
let saveAcc = JSON.parse(localStorage.getItem("Account"));
let SaveAcc = saveAcc;

export default function App() {
  const [cart, setCart] = useState(SaveCart);
  const [AccountName, setAccountName] = useState(SaveAcc);
  const [IsOpenCart, setIsOpenCart] = useState(false);
  function updateCart(product) {
    let newCart = { ...cart };
    let acn = AccountName;
    if (product === "Paid") {
      newCart[acn] = [];
    } else if (acn) {
      let PNameArr = [];
      newCart[acn].forEach((c) => {
        PNameArr.push(c.name);
      });
      if (!PNameArr.includes(product.name)) {
        newCart[acn].push({ ...product, qty: 1 });
      } else {
        for (let i = 0; i < newCart[acn].length; i++) {
          if (
            newCart[acn].length > 0 &&
            newCart[acn][i].name === product.name &&
            product.qty === 0
          ) {
            newCart[acn].splice(i, 1);
          } else if (
            newCart[acn].length > 0 &&
            newCart[acn][i].name === product.name
          ) {
            newCart[acn][i].qty = product.qty;
          }
        }
      }
    }
    localStorage.setItem("Cart", JSON.stringify(newCart));
    SaveCart = newCart;
    console.log(newCart);
    setCart(newCart);
  }
  function updateAccountName(Name) {
    let newCart = cart;
    if (!Object.keys(newCart).includes(Name) && Name !== null) {
      newCart[Name] = [];
    }
    localStorage.setItem("Cart", JSON.stringify(newCart));
    SaveCart = newCart;
    localStorage.setItem("Account", JSON.stringify(Name));
    SaveAcc = Name;
    setCart(newCart);
    setAccountName(Name);
  }
  function updateIsOpenCart(Order) {
    setIsOpenCart(Order);
  }

  //Weather
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    async function fetchWeatherData() {
      const weatherAPI =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
      const res = await fetch(weatherAPI);
      const weatherData = await res.json();

      const location = weatherData.temperature.data[1].place;
      const temperature = weatherData.temperature.data[1].value;
      const updateTime = weatherData.updateTime;
      const fomatTime = `${updateTime.slice(0, 10)}, ${updateTime.slice(
        11,
        16
      )}`;

      setLocation(location);
      setTemperature(temperature);
      setUpdateTime(fomatTime);

      if (temperature < 15) {
        setWeather("cold");
      } else if (temperature > 35) {
        setWeather("hot");
      } else {
        setWeather("normal");
      }
    }
    fetchWeatherData();
  }, []);


  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        {isLoading ? (
          <LoadingSpinner /> 
        ) : (
          <Routes>
            <Route
              index
              element={
                <Home />
              }
            />
            <Route
              path="Checkout"
              element={<Checkout />}
            />
            <Route
              path="Signin"
              element={<Signin />}
            />
            <Route path="/:categoryName" element={<CategoriesPage />} />
            <Route
              path="/:categoryName/:smallCategoriesName"
              element={<SmallCategoriesPage />}
            />
            <Route path="/products/:productPage" element={<ProductPage />} />
          </Routes>
        )}
      </BrowserRouter>
      <Footer />
      <ScrollButton />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
