import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#050607] text-white">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}