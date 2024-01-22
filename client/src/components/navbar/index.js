import React from "react";
import { Link } from "react-router-dom";
import './css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/clients" className="nav-item">
            Lista Clientes
          </Link>
        </li>
        <li>
          <Link to="/clients/new" className="nav-item">
            Cadastra Cliente
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
