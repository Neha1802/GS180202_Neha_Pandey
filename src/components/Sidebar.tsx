import { Link, useLocation } from "react-router-dom";
import { FaStore, FaBox, FaClipboardList, FaChartBar } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="sidebar">
      <ul>
        <li className={location.pathname === "/stores" ? "active" : ""}>
          <Link to="/stores">
            <FaStore className="icon" />
            <span>Store</span>
          </Link>
        </li>
        <li className={location.pathname === "/skus" ? "active" : ""}>
          <Link to="/skus">
            <FaBox className="icon" />
            <span>SKU</span>
          </Link>
        </li>
        <li className={location.pathname === "/planning" ? "active" : ""}>
          <Link to="/planning">
            <FaClipboardList className="icon" />
            <span>Planning</span>
          </Link>
        </li>
        <li className={location.pathname === "/chart" ? "active" : ""}>
          <Link to="/chart">
            <FaChartBar className="icon" />
            <span>Chart</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
