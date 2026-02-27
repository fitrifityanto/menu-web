"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const MobileSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Ambil initial value dari URL sekali saja
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    // 1. JANGAN jalankan router.push jika input kosong DAN kita tidak di halaman /menu
    // Ini mencegah auto-redirect saat web baru dibuka
    if (!inputValue && pathname !== "/menu") return;

    // 2. Debounce logic
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }

      const newQuery = params.toString();
      const currentQuery = searchParams.toString();

      // 3. HANYA push jika query-nya memang berubah
      // Ini mencegah infinite loop
      if (newQuery !== currentQuery || pathname !== "/menu") {
        startTransition(() => {
          router.push(`/menu?${newQuery}`, { scroll: false });
        });
      }
    }, 500); // Naikkan ke 500ms agar lebih stabil

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, pathname, router]); // Hapus searchParams dari dependency untuk hindari loop

  return (
    <div className="md:hidden sticky top-0 z-40 bg-santan/95 backdrop-blur-md px-6 py-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search
            size={18}
            className={`transition-colors ${
              isPending ? "text-kunyit animate-pulse" : "text-terakota"
            }`}
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Cari nama menu..."
          className="w-full bg-white border border-terakota/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-gula-jawa focus:outline-none focus:ring-2 focus:ring-kunyit/20 focus:border-kunyit"
        />
      </div>
    </div>
  );
};

export default MobileSearch;
