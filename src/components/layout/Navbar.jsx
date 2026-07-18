import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FiShoppingBag, FiUsers, FiArchive } from 'react-icons/fi';
import { MdDiamond } from 'react-icons/md';
import './Navbar.css';

export default function Navbar() {
  const { collections } = useApp();
  const totalItems = Object.values(collections).flat().length;

  return (
    <>
      {/* Top bar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="navbar-brand">
            <MdDiamond className="brand-icon" />
            <span className="brand-name">Collector's Hub</span>
          </NavLink>
          <div className="navbar-links">
            <NavLink to="/marketplace" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              <FiShoppingBag className="nav-icon" size={15} />
              Marketplace
            </NavLink>
            <NavLink to="/feed" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              <FiUsers className="nav-icon" size={15} />
              Community
            </NavLink>
            <NavLink to="/collection" className={({ isActive }) => 'nav-link collection-link' + (isActive ? ' active' : '')}>
              <FiArchive className="nav-icon" size={15} />
              My Collection
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Bottom tab bar — visible only on mobile via CSS */}
      <div className="bottom-nav">
        <NavLink to="/marketplace" className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')}>
          <FiShoppingBag className="bottom-nav-icon" size={22} />
          Market
        </NavLink>
        <NavLink to="/feed" className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')}>
          <FiUsers className="bottom-nav-icon" size={22} />
          Community
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')}>
          <FiArchive className="bottom-nav-icon" size={22} />
          Collection
          {totalItems > 0 && <span className="bottom-badge">{totalItems}</span>}
        </NavLink>
      </div>
    </>
  );
}
