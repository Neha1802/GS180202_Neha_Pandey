import { Link } from "react-router-dom";
import { FaStore, FaBox, FaClipboardList, FaChartBar } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/stores">
            <FaStore className="icon" />
            <span>Stores</span>
          </Link>
        </li>
        <li>
          <Link to="/skus">
            <FaBox className="icon" />
            <span>SKUs</span>
          </Link>
        </li>
        <li>
          <Link to="/planning">
            <FaClipboardList className="icon" />
            <span>Planning</span>
          </Link>
        </li>
        <li>
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
