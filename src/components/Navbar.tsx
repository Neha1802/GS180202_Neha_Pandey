import '../styles//Navbar.css';
import logo from "/gSynergy-logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="G-Synergy Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <button className="sign-in-btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
