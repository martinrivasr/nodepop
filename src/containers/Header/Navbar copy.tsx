import React from "react";

const Navbar = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark px-3 border-warning border-4">
      <div className="container-fluid d-flex align-items-center justify-content-between border-success border-4">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-house fs-3 me-2"></i>
          Nodepop
        </a>

        {/* Menú principal */}
        <ul className="navbar-nav d-flex flex-row gap-3 me-auto">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              <i className="bi bi-house d-flex flex-column align-items-center fs-3"></i>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-primary" href="/dashboard">
              <i className="bi bi-speedometer2 d-flex flex-column align-items-center fs-3"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-secondary" href="/orders">
              <i className="bi bi-table d-flex flex-column align-items-center fs-3"></i>
              Orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-success" href="/products">
              <i className="bi bi-grid d-flex flex-column align-items-center fs-3"></i>
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="/customers">
              <i className="bi bi-person-circle d-flex flex-column align-items-center fs-3"></i>
              Customers
            </a>
          </li>
        </ul>

        {/* Dropdown de idioma */}
        <div className="dropdown me-3">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Idioma
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item">
                <img
                  src="/es.svg"
                  alt="Español"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Español
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                <img
                  src="/en.svg"
                  alt="Inglés"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Inglés
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                <img
                  src="/fr.svg"
                  alt="Français"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Français
              </button>
            </li>
          </ul>
        </div>

        {/* Menú de usuario */}
        <div className="dropdown me-3">
          <button
            className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ padding: 0, backgroundColor: "transparent", border: "none" }}
          >
            <img
              src="https://github.com/mdo.png"
              alt="User"
              width="40"
              height="40"
              className="rounded-circle"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="/my-products">
                My Products...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/settings">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={() => alert("Signed out")}>
                Sign out
              </button>
            </li>
          </ul>
        </div>

        {/* Botón de Logout */}
        <button type="button" className="btn btn-primary">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
