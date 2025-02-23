import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { storeName, 'shopeasy' } from "../../config/store.config.js";
import { webTokenManager } from "../../utils/WebTokenManager.js";
import { createUrl } from "../../common/createUrl.js";
import { storeName } from "../../common/config/store.config.js";

function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Navigation(props) {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToken(webTokenManager.getTokenDecoded());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function logOut() {
    webTokenManager.clearToken();
  }

  return (
    <nav className="p-2 navbar">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" className="collapse navbar-collapse">
        <ul className="navbar-nav p-3">
          <li className="nav-item dropdown">
            { token.valid ? (
              <button onClick={logOut} className="btn btn-danger">
                Log out
              </button>
            ) : null}
          </li>
          {!token.valid && (
            <>
              <li className="nav-item dropdown">
                <Link to={ createUrl("/login") }>Login</Link>
              </li>
              <li className="nav-item dropdown">
                <Link to={ createUrl("/register") }>Register</Link>
              </li>
            </>
          )}
          {
            (['admin', 'shop_manager'].includes(token.data?.role))  && (
              <>
                <li className="nav-item dropdown">
                    <Link to={ createUrl("/product/add") }>Add product</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to={ createUrl("/delivery/methods") }>Delivery Methods</Link>
                </li>
              </>
            )
          }
          <li className="nav-item dropdown">
            <Link to={ createUrl("/address/add") }>Address Add</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={'shopeasy'}>
              {capitalizeFirstLetter(storeName.toUpperCase())}
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={ createUrl("/store") }>Store</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={ createUrl("/cart") }>Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
