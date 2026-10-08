import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Join Us", path: "/join-us" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="flex items-center justify-between px-4 py-3 md:px-5">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <img
            src="/assets/engineering-india-ghrce-logo.png"
            alt="Engineering India GHRCE"
            className="brand-logo"
          />

          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight text-white">
              ENGINEERING INDIA
            </div>

            <div className="text-[10px] font-medium tracking-[0.25em] text-zinc-500">
              GHRCE
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3 py-2 text-[13px] font-medium transition ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://www.instagram.com/engineeringindia_ghrce?stkn=ZXMwZDBic3Vqazdi"
            aria-label="Instagram"
            className="rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <Instagram size={16} />
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <Linkedin size={16} />
          </a>

          <a
            href="https://chat.whatsapp.com/Bv68Z3vKmJiEPDZP5WsGht"
            aria-label="WhatsApp"
            className="rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <MessageCircle size={16} />
          </a>

          <Link to="/join-us" className="btn-primary ml-2 px-4 py-2 text-xs">
            JOIN OUR COMMUNITY
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 px-4 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-3 border-t border-white/10 pt-4 text-sm font-semibold text-zinc-400"
            >
              Admin Login →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}