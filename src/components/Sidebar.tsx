import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStore, FaBox, FaClipboardList, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          <li className={location.pathname === "/stores" ? "active" : ""}>
            <Link to="/stores" onClick={() => setIsOpen(false)}>
              <FaStore className="icon" />
              <span>Store</span>
            </Link>
          </li>
          <li className={location.pathname === "/skus" ? "active" : ""}>
            <Link to="/skus" onClick={() => setIsOpen(false)}>
              <FaBox className="icon" />
              <span>SKU</span>
            </Link>
          </li>
          <li className={location.pathname === "/planning" ? "active" : ""}>
            <Link to="/planning" onClick={() => setIsOpen(false)}>
              <FaClipboardList className="icon" />
              <span>Planning</span>
            </Link>
          </li>
          <li className={location.pathname === "/chart" ? "active" : ""}>
            <Link to="/chart" onClick={() => setIsOpen(false)}>
              <FaChartBar className="icon" />
              <span>Chart</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
