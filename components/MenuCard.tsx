"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const message = `Halo Gudeg ndalem simbok, saya ingin memesan:\n\n*${item.name}*\n(Harga: ${formatIDR(item.price)})\n\nApakah masih tersedia?`;
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group bg-santan rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
      {/* Container Gambar */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-kunyit text-gula-jawa text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            {item.categories[0]?.name || "Menu"}
          </span>
        </div>
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Konten Teks */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-gula-jawa line-clamp-1">
            {item.name}
          </h3>
        </div>

        <span className="text-terakota font-semibold block mb-2">
          {formatIDR(item.price)}
        </span>

        <p className="text-sm text-terakota leading-relaxed mb-6 font-light line-clamp-2 flex-grow">
          {item.description}
        </p>

        <a
          href={item.is_available ? waLink : "#"}
          target={item.is_available ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 border border-terakota/30 rounded-xl transition-all duration-300 ${
            item.is_available
              ? "text-gula-jawa hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
          }`}
          onClick={(e) => !item.is_available && e.preventDefault()}
        >
          <MessageCircle size={18} />
          <span>{item.is_available ? "Pesan via WhatsApp" : "Habis Stok"}</span>
        </a>
      </div>
    </div>
  );
}
