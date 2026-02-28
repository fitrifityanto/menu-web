"use client";

import React from "react";
import Link from "next/link";
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
      {/* Container Gambar - Rasio 4:5 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
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
      <div className="p-5 flex flex-col flex-grow text-center">
        {/* Nama Menu - Maksimal 2 Baris */}
        <div className="flex justify-center items-start mb-2">
          <h3 className="font-serif text-xl text-gula-jawa line-clamp-2">
            {item.name}
          </h3>
        </div>

        {/* Tombol Detail */}
        <div className="mt-auto">
          <Link
            href={`/menu/${item.ID}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-terakota/10 text-terakota border border-terakota/20 rounded-xl font-medium transition-all duration-300 hover:bg-terakota hover:text-white text-center"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
