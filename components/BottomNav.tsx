//components/BottomNav.tsx
"use client";

import { Home, UtensilsCrossed, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

const BottomNav = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const navItems = [
    { name: "Beranda", icon: <Home size={20} />, href: "/" },
    { name: "Menu", icon: <UtensilsCrossed size={20} />, href: "/#menu" },
    { name: "Lokasi", icon: <MapPin size={20} />, href: "/#lokasi" },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      href: `https://wa.me/${phoneNumber}`,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 md:hidden">
      <div className="bg-gula-jawa/90 backdrop-blur-md border border-white/10  py-3 px-6 shadow-2xl flex justify-between items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center gap-1 text-santan/70 hover:text-kunyit transition-colors duration-300"
          >
            {item.icon}
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
