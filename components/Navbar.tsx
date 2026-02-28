//components/Navbar.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  useEffect(() => {
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

      if (newQuery !== currentQuery || pathname !== "/menu") {
        startTransition(() => {
          router.push(`/menu?${newQuery}`, { scroll: false });
        });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, pathname, router]);

  const handleFocus = () => {
    if (pathname !== "/menu") {
      const url = inputValue ? `/menu?search=${inputValue}` : "/menu";
      router.push(url);
    }
  };
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

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
        <Link
          href="/"
          className="transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/logo-gudegndalemsimbok.jpg"
            alt="Logo Gudeg Ndalem Simbok"
            width={180}
            height={60}
            priority
            className="w-[150px] md:w-[180px] h-auto object-contain"
          />
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
              onFocus={handleFocus}
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
                if (isSearchOpen) setInputValue("");
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
            href={`https://wa.me/${phoneNumber}`}
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
