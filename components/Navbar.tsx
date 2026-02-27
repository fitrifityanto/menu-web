//components/Navbar.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
// Tetap gunakan next/navigation untuk hook navigasi
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State untuk input search desktop
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logika Debounce untuk Search Desktop
  useEffect(() => {
    // Jangan lakukan apa-apa jika input kosong dan tidak di /menu
    if (!inputValue && pathname !== "/menu") return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }

      const newQuery = params.toString();
      const currentQuery = searchParams.toString();

      // Jalankan router push hanya jika query berubah atau berpindah halaman
      if (newQuery !== currentQuery || pathname !== "/menu") {
        startTransition(() => {
          router.push(`/menu?${newQuery}`, { scroll: false });
        });
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, pathname, router]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-santan/90 backdrop-blur-lg shadow-sm"
          : "py-6 bg-transparent"
      } hidden md:block`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-gula-jawa">
          Gudeg
          <span className="text-terakota italic font-normal">NdalemSimbok</span>
        </Link>

        {/* Navigation & Search */}
        <nav className="flex items-center gap-8">
          {/* Search Desktop */}
          <div
            className={`relative flex items-center transition-all duration-500 ${
              isSearchOpen || inputValue ? "w-64" : "w-10"
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cari menu..."
              className={`w-full bg-white/70 border border-terakota/20 rounded-full py-2 pl-10 pr-4 outline-none focus:border-kunyit transition-all duration-500 ${
                isSearchOpen || inputValue
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } ${isPending ? "border-kunyit animate-pulse" : ""}`}
            />
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setInputValue(""); // Reset jika user menutup search
              }}
              className="absolute left-0 p-2 text-gula-jawa hover:text-terakota transition-colors"
            >
              {isSearchOpen || inputValue ? (
                <X size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>

          {/* Sembunyikan Nav Link saat user sedang fokus mencari */}
          {!isSearchOpen && !inputValue && (
            <div className="flex gap-8">
              <Link
                href="/"
                className="text-gula-jawa hover:text-terakota transition-colors font-medium"
              >
                Beranda
              </Link>
              <Link
                href="/#menu"
                className="text-gula-jawa hover:text-terakota transition-colors font-medium"
              >
                Menu
              </Link>
              <Link
                href="/#lokasi"
                className="text-gula-jawa hover:text-terakota transition-colors font-medium"
              >
                Lokasi
              </Link>
            </div>
          )}

          <Link
            href="https://wa.me/your-number"
            className="bg-gula-jawa text-santan px-6 py-2.5 rounded-full hover:bg-terakota transition-all duration-300 shadow-md"
          >
            Pesan
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
