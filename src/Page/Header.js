import { Link } from "react-router-dom";
import { useState } from "react";
import Weather from "./Component/Weather.js";
import Inputbox from "./Component/input.js";
import Cart from "./Component/SC.js";
import { item } from "./Component/product";
import { FaCaretDown } from "react-icons/fa";
import { categories } from "./Component/categoriesData.js";

function Header(props) {
  const temperature = props.temperature;
  const weather = props.weather;
  const [OpenLogin, setOpenLogin] = useState(true);
  function ButtonLink({ to, BtnName }) {
    return <Link to={to}>{BtnName}</Link>;
  }

  const dropdownLinks = categories;

  return (
    <>
      <div class=" bg-blue-600 mx-auto flex max-h-24 min-w-auto items-center p-2 lg:px-4">
        <div>
          <div class="h-auto w-36 pt-2 ml-1 mr-0 sm:w-48 sm:mx-4">
            <ButtonLink
              to="/"
              BtnName={
                <button>
                  <img
                    src="https://api.pns.hk/medias/PNS-logo-2X.png?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4MDE0fGltYWdlL3BuZ3xhREZsTDJnNU5DOHhNRFl4TmprNU9EazROVGMxT0M5UVRsTmZiRzluYjE4eVdDNXdibWN8Nzg4ODYyOWY1NDEwM2VhMjNkMjJiN2M5ODkxMzQzMjVkYWNkMWQ1NWJhMDk5OWIwZTgzMGViMGE2YzljNTllZQ"
                    alt="logo"
                  />
                </button>
              }
            />
          </div>
        </div>
        <div>
          <div class="h-auto w-6 m-2 hidden sm:block">
            <img src="/SerachBtn.png" />
          </div>
        </div>
        <Inputbox />
        <Weather temperature={temperature} weather={weather} />
        <div class="mr-0 flex text-1xl text-white flex-row items-center sm:mr-5">
          {props.Account ? (
            <>
              <div class="w-28 px-0 mr-0 ml-0 sm:mr-6 sm:ml-10 lg:mr-36">
                Welcome,{props.Account}
              </div>
              <ButtonLink
                to="/"
                BtnName={
                  <button
                    onClick={() => {
                      setOpenLogin(!OpenLogin);
                      props.updateAccountName(null);
                    }}
                    class="flex text-1xl text-white flex-row items-center"
                  >
                    <div class="h-auto w-9 pl-2 pr-2">
                      <img src="/AccBtn.png" />
                    </div>
                    Logout
                  </button>
                }
              />
            </>
          ) : (
            <>
              <div class="w-0 px-0 mr-0 ml-0 sm:mr-6 sm:ml-10 lg:mr-36"></div>
              <ButtonLink
                to="Account"
                BtnName={
                  <button class="flex text-1xl text-white flex-row items-center">
                    <div class="h-auto w-9 pl-2 pr-2">
                      <img src="/AccBtn.png" />
                    </div>
                    <div class="hidden sm:block">Login</div>
                  </button>
                }
              />
            </>
          )}
        </div>
        <div>
          <div class="h-auto w-6 ml-1">
            <img src="/WishBtn.png" />
          </div>
        </div>
        <button
          onClick={() => {
            props.updateIsOpenCart(!props.OpenCart);
          }}
        >
          <div class="h-auto w-6 m-2">
            <img src="/CartBtn.png" />
          </div>
        </button>
        {props.OpenCart && !props.Account && (
          <div style={{ borderStyle: "solid", width: "300px" }}>
            <h3>Shop Cart</h3>
            <button
              onClick={() => {
                props.updateIsOpenCart(!props.OpenCart);
              }}
            >
              X
            </button>
            <h5>Please Login First !</h5>
          </div>
        )}
        {props.OpenCart && props.Account && (
          <div style={{ borderStyle: "solid", width: "300px" }} class="z-50">
            <h3>Shop Cart</h3>
            <button
              onClick={() => {
                props.updateIsOpenCart(!props.OpenCart);
              }}
            >
              X
            </button>
            <Cart
              ItemChangeIncart={props.updateCart}
              CartItems={props.CartItem}
              CartAccount={props.Account}
            />
            {props.CartItem[props.Account].length > 0 ? (
              <ButtonLink
                to="Checkout"
                BtnName={
                  <button
                    className="bg-gray-500"
                    onClick={() => {
                      props.updateIsOpenCart(!props.OpenCart);
                    }}
                  >
                    Get Total
                  </button>
                }
              />
            ) : (
              <button className="bg-gray-500">Get Total</button>
            )}
          </div>
        )}
      </div>

      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 flex justify-evenly">
        {dropdownLinks
          .filter((item) => item.Parent === item.id)
          .map((bigcategorie) => (
            <li
              key={bigcategorie.id}
              className="list-none group relative cursor-pointer"
            >
              <Link
                to={`/${bigcategorie.Name}`}
                className="flex items-center gap-[2px] py-2"
              >
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
                {bigcategorie.Name}
              </Link>
              <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {dropdownLinks
                    .filter(
                      (item) =>
                        item.Parent === bigcategorie.id &&
                        item.Parent !== item.id
                    )
                    .map((smallCategory) => (
                      <li key={smallCategory.id}>
                        <Link
                          to={`/${bigcategorie.Name}/${smallCategory.Name}`}
                        >
                          {smallCategory.Name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
      </div>
    </>
  );
}

export default Header;
