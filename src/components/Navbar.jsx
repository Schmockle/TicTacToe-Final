import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Røde Kors</h1>
      <ul className="nav-links">
        <li><Link to="/">Hjem</Link></li>
        <li><Link to="/about">Om oss</Link></li>
        <li><Link to="/services">Tjenester</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
}
