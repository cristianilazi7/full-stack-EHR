"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import "@/styles/nav.css";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/ehr-management", label: "EHR Management" },
  { href: "/dashboard/admin-patients", label: "Admin Patients" },
  { href: "/dashboard/admin-doctors", label: "Admin Doctors" },
  { href: "/dashboard/admin-settings", label: "Settings" },
  { href: "/dashboard/admin-profile", label: "Profile" },
];

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link href="/" className="nav__logo">
          EHR Manager
        </Link>

        {/* Desktop Menu */}
        <div className="nav__menu">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav__menu-item ${pathname === href ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="nav__mobile-menu">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav__menu-item"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
