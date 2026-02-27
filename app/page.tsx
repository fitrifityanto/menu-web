//app/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Leaf,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react";
import { MenuItem, ApiResponse } from "@/types/menu";
import MenuCard from "@/components/MenuCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getMenus() {
  const res = await fetch(`${API_URL}/api/menus?category_id=2`, {
    cache: "no-store",
    headers: {
      "X-API-KEY": process.env.NEXT_SERVER_API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal memuat data: Status ${res.status}`);
  }

  const response: ApiResponse = await res.json();
  return response.data;
}

export default async function Home() {
  const allMenus: MenuItem[] = await getMenus();
  const favoriteIds = [5, 2, 1];
  const menuAndalan = allMenus.filter((item) => favoriteIds.includes(item.ID));
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  return (
    <div className="flex flex-col items-center">
      {/* 1. HERO SECTION (Sudah ada di tahap sebelumnya) */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="relative z-20 text-center max-w-3xl">
          <span className="inline-block px-4 py-1 mb-4 border border-terakota text-terakota text-sm tracking-[0.2em] uppercase rounded-full">
            Gudeg ndalem simbok
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-gula-jawa mb-6">
            Resep Keluarga di <br />
            <span className="italic">Setiap Rasa</span>
          </h1>
          <Link
            href="/menu"
            className="bg-gula-jawa text-santan px-8 py-4 rounded-full font-medium hover:bg-terakota transition-all duration-300 shadow-lg active:scale-95 inline-block"
          >
            Lihat Menu Hari Ini
          </Link>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION (The "Rustic" Story) */}
      <section className="w-full max-w-6xl px-6 py-20 border-t border-gula-jawa/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-terakota/10 flex items-center justify-center rounded-full text-terakota">
              <Heart size={32} />
            </div>
            <h3 className="font-serif text-2xl text-gula-jawa text-center">
              Resep Warisan Keluarga
            </h3>
            <p className="text-terakota leading-relaxed font-light text-center">
              Olahan turun-temurun dengan cita rasa gudeg yang otentik resep
              warisan keluarga.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-terakota/10 flex items-center justify-center rounded-full text-terakota">
              <Leaf size={32} />
            </div>
            <h3 className="font-serif text-2xl text-gula-jawa">Bumbu Alami</h3>
            <p className="text-terakota leading-relaxed font-light">
              Hanya menggunakan Gula Jawa pilihan dan santan murni dari kelapa
              tua terbaik.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-terakota/10 flex items-center justify-center rounded-full text-terakota">
              <Clock size={32} />
            </div>
            <h3 className="font-serif text-2xl text-gula-jawa">
              Proses Lambat
            </h3>
            <p className="text-terakota leading-relaxed font-light">
              Kesabaran adalah bumbu rahasia kami. Tanpa pengawet, murni dari
              dapur tradisional.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MENU CATALOG SECTION */}
      <section
        id="menu"
        className="w-full bg-white/30 py-24 px-6 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-md">
              <h2 className="font-serif text-4xl text-gula-jawa mb-4 underline decoration-kunyit/40 underline-offset-8">
                Menu Andalan Kami
              </h2>
              <p className="text-terakota">
                Pilihan hidangan otentik yang diracik khusus untuk memanjakan
                lidah Anda.
              </p>
            </div>
            <Link
              href="/menu"
              className="text-gula-jawa font-medium border-b-2 border-kunyit pb-1 hover:text-terakota transition-colors inline-block"
            >
              Lihat Semua Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuAndalan.map((item) => (
              <MenuCard key={item.ID} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LOKASI & KONTAK SECTION */}
      <section id="lokasi" className="w-full py-16 md:py-24 px-6 bg-santan">
        <div className="max-w-6xl mx-auto">
          {/* Container Utama: Stacked di Mobile (grid-cols-1), Side-by-Side di Tablet ke atas (md:grid-cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Kolom Kiri: Informasi (Akan di atas pada mobile) */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
              <div>
                <span className="text-kunyit font-medium tracking-widest uppercase text-xs md:text-sm">
                  Kunjungi Kami
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-gula-jawa mt-2 mb-4 md:mb-6 leading-tight">
                  Mampir Yuk <br className="hidden md:block" />
                  <span className="italic text-terakota">
                    Gudeg Ndalem Simbok
                  </span>
                </h2>
                <p className="text-terakota leading-relaxed max-w-sm md:max-w-md mx-auto md:mx-0">
                  Nikmati Gudeg Salatiga resep turun temurun.
                </p>
              </div>

              {/* Detail List: Mengatur agar ikon tetap rapi meski teks berpusat */}
              <div className="space-y-6 w-full max-w-sm md:max-w-none">
                {/* Item Alamat */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-terakota">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-gula-jawa">
                      Alamat
                    </h4>
                    <p className="text-terakota text-sm leading-relaxed">
                      Ngentak 2/07, Rt 15, Rw 5, Salatiga
                    </p>
                  </div>
                </div>

                {/* Item Jam */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-terakota">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-gula-jawa">
                      Jam Operasional
                    </h4>
                    <p className="text-terakota text-sm leading-relaxed">
                      Setiap Hari: 06.00 — 21.00 WIB
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a
                  href={`https://wa.me/${phoneNumber}`}
                  className="w-full md:w-auto bg-gula-jawa text-santan px-8 py-4 rounded-2xl font-medium hover:bg-terakota transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  Pesan via WhatsApp
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>

                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/gudegndalemsimbok/"
                    className="w-12 h-12 border border-terakota/20 rounded-2xl flex items-center justify-center text-gula-jawa hover:bg-kunyit hover:border-kunyit transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border border-terakota/20 rounded-2xl flex items-center justify-center text-gula-jawa hover:bg-kunyit hover:border-kunyit transition-all"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Peta (Akan di bawah pada mobile) */}
            <div className="relative w-full h-[350px] md:h-[500px]">
              {/* Dekorasi belakang peta (hanya muncul di tablet/desktop agar tidak penuh di mobile) */}
              <div className="hidden md:block absolute -top-4 -right-4 w-24 h-24 bg-kunyit/20 rounded-full blur-2xl -z-10" />
              <div className="hidden md:block absolute -bottom-4 -left-4 w-32 h-32 bg-terakota/10 rounded-full blur-2xl -z-10" />

              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 md:border-8 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2358331332553!2d110.50744251010471!3d-7.327387892650367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79001415a6bf%3A0x1110913d6256063c!2sBubur%20Semangat%20Pagi!5e0!3m2!1sid!2sid!4v1772011321052!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER*/}
      <footer className="w-full py-12 px-6 border-t border-gula-jawa/5 bg-santan text-center">
        <p className="font-serif text-gula-jawa text-xl mb-2 italic">
          Gudeg Ndalem Simbok
        </p>
        <p className="font-serif text-gula-jawa text-md mb-2">
          Group by Bubur Semangat Pagi
        </p>

        <p className="text-terakota text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} — Gudeg Salatiga asli resep turun
          temurun Kelurga
        </p>
      </footer>
    </div>
  );
}
