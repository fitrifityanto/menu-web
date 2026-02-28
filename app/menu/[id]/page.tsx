// app/menu/[id]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { MenuItem, SingleApiResponse } from "@/types/menu";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getMenuDetail(id: string): Promise<MenuItem | null> {
  try {
    const res = await fetch(`${API_URL}/api/menus/${id}`, {
      cache: "no-store",
      headers: {
        "X-API-KEY": process.env.NEXT_SERVER_API_KEY || "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;

    const response: SingleApiResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error("Error fetching menu detail:", error);
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const item = await getMenuDetail(params.id);

  return {
    title: item ? `${item.name} | Gudeg Ndalem Simbok` : "Menu Tidak Ditemukan",
    description:
      item?.description || "Detail menu lezat dari Gudeg Ndalem Simbok",
  };
}

export default async function DetailMenu(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const item = await getMenuDetail(params.id);

  if (!item) {
    notFound();
  }

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";
  const waMessage = `Halo Gudeg Ndalem Simbok, saya ingin memesan:\n\n*${item.name}*\n(Harga: ${formatIDR(item.price)})\n\nApakah masih tersedia?`;
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-santan">
      {/* 1. Header Mobile & Back Button */}
      {/* <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center md:hidden"> */}
      {/*   <Link */}
      {/*     href="/menu" */}
      {/*     className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gula-jawa" */}
      {/*   > */}
      {/*     <ArrowLeft size={20} /> */}
      {/*   </Link> */}
      {/* </div> */}

      <div className="max-w-6xl mx-auto md:pt-32 pb-32">
        <div className="flex flex-col md:flex-row gap-12 px-6">
          {/* 2. Bagian Gambar */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-terakota/20">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-kunyit text-gula-jawa font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest">
                {item.categories[0]?.name || "Menu"}
              </div>
            </div>
          </div>

          {/* 3. Bagian Informasi */}
          <div className="w-full md:w-1/2 flex flex-col space-y-8">
            <div>
              <nav className="hidden md:flex items-center gap-2 text-terakota text-sm mb-4">
                <Link href="/" className="hover:text-gula-jawa">
                  Beranda
                </Link>
                <ChevronRight size={14} />
                <Link href="/menu" className="hover:text-gula-jawa">
                  Menu
                </Link>
                <ChevronRight size={14} />
                <span className="text-gula-jawa font-medium">{item.name}</span>
              </nav>

              <h1 className="font-serif text-4xl md:text-6xl text-gula-jawa leading-tight">
                {item.name}
              </h1>
              <p className="text-2xl text-terakota font-semibold mt-4">
                {formatIDR(item.price)}
              </p>
            </div>

            {/* Info Tambahan (Disesuaikan dengan data API jika ada) */}
            {/* <div className="flex gap-4"> */}
            {/*   <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-terakota/5"> */}
            {/*     <Users size={18} className="text-terakota" /> */}
            {/*     <span className="text-xs text-gula-jawa font-medium"> */}
            {/*       1-2 Porsi */}
            {/*     </span> */}
            {/*   </div> */}
            {/*   <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-terakota/5"> */}
            {/*     <Clock size={18} className="text-terakota" /> */}
            {/*     <span className="text-xs text-gula-jawa font-medium"> */}
            {/*       Fresh Daily */}
            {/*     </span> */}
            {/*   </div> */}
            {/* </div> */}

            <div className="space-y-4">
              {/* <h3 className="font-serif text-xl text-gula-jawa"> */}
              {/*   Filosofi Rasa */}
              {/* </h3> */}
              <p className="text-terakota leading-relaxed italic">
                {item.description ||
                  "Hidangan istimewa yang dimasak dengan resep turun temurun, menyajikan kehangatan tradisi di setiap suapan."}
              </p>
            </div>

            {/* Tombol Pesan */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gula-jawa text-santan py-4 rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-terakota transition-all shadow-xl active:scale-95"
              >
                <MessageCircle size={22} />
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
