"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/bai-viet", label: "Bài viết" },
  { href: "/theo-doi-be", label: "Theo dõi bé" },
  { href: "/#ve-mam-nho", label: "Về Mầm Nhỏ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu ngang cho màn hình rộng */}
      <nav className="hidden sm:flex items-center gap-6 text-sm text-ink-soft">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Nút hamburger cho màn hình nhỏ */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden text-forest p-2 -mr-2"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {/* Menu sổ xuống cho màn hình nhỏ */}
      {open && (
        <nav className="sm:hidden absolute top-full left-0 right-0 bg-cream border-b border-line flex flex-col px-6 py-4 gap-4 text-sm text-ink-soft">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hover:text-forest transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
