import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#040506]">
      <div className="container mx-auto px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/engineering-india-ghrce-logo.png"
                alt="Engineering India GHRCE"
                className="h-14 w-14 rounded-full object-contain"
              />

              <div>
                <div className="font-bold text-white">
                  ENGINEERING INDIA
                </div>
                <div className="text-xs tracking-[0.3em] text-zinc-600">
                  GHRCE
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
              A student-led community for learning, building, connecting and
              turning curiosity into meaningful action.
            </p>

            <div className="mt-6 flex gap-2">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/engineeringindia_ghrce/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="rounded-full border border-white/10 p-2.5 text-zinc-500 transition hover:border-orange-500/30 hover:text-orange-400"
  >
    <Instagram size={17} />
  </a>

  {/* LinkedIn */}
  <a
    href="YOUR_LINKEDIN_LINK_HERE"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    className="rounded-full border border-white/10 p-2.5 text-zinc-500 transition hover:border-orange-500/30 hover:text-orange-400"
  >
    <Linkedin size={17} />
  </a>

  {/* WhatsApp */}
  <a
    href="https://chat.whatsapp.com/Bv68Z3vKmJiEPDZP5WsGht"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
    className="rounded-full border border-white/10 p-2.5 text-zinc-500 transition hover:border-orange-500/30 hover:text-orange-400"
  >
    <MessageCircle size={17} />
  </a>
</div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
              <Link className="hover:text-white" to="/about">
                About
              </Link>
              <Link className="hover:text-white" to="/team">
                Team
              </Link>
              <Link className="hover:text-white" to="/events">
                Events
              </Link>
              <Link className="hover:text-white" to="/projects">
                Projects
              </Link>
              <Link className="hover:text-white" to="/gallery">
                Gallery
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Community
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
              <Link className="hover:text-white" to="/join-us">
                Join Us
              </Link>
              <Link className="hover:text-white" to="/contact">
                Contact
              </Link>
              <Link className="hover:text-white" to="/admin/login">
                Admin Login
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Find Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-zinc-500">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-orange-500" size={17} />
                <span>
                  G. H. Raisoni College of Engineering,
                  <br />
                  Nagpur, Maharashtra
                </span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-green-500" size={17} />
                <span>raisoniengineeringindia@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-600 md:flex-row">
          <span>
            © {new Date().getFullYear()} Engineering India GHRCE. All rights
            reserved.
          </span>

          <span className="flex items-center gap-2">
            Innovate
            <span className="text-orange-500">•</span>
            Lead
            <span className="text-green-500">•</span>
            Impact
          </span>
        </div>
      </div>
    </footer>
  );
}