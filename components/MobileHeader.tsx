// components/MobileHeader.tsx
"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ArrowLeft, X } from "lucide-react";

const MobileHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedQuery, setDebouncedQuery] = useState(inputValue);

  const isDetailPage = pathname.startsWith("/menu/");

  const handleFocus = () => {
    if (pathname !== "/menu") {
      const url = inputValue ? `/menu?search=${inputValue}` : "/menu";
      router.push(url);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 500); // Naikkan sedikit ke 500ms agar lebih aman di HP

    return () => clearTimeout(handler);
  }, [inputValue]);

  // 3. useEffect kedua: Menangani navigasi (Hanya jalan saat debouncedQuery berubah)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedQuery === currentSearch && pathname === "/menu") return;

    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/menu?${params.toString()}`, { scroll: false });
    });
  }, [debouncedQuery, pathname, router]);

  return (
    <div className="md:hidden sticky top-0 z-40 bg-santan/95 backdrop-blur-md px-6 py-4">
      <div className="flex items-center gap-1">
        <div
          className={`flex items-center transition-all duration-300 ease-in-out ${
            isDetailPage
              ? "w-12 opacity-100"
              : "w-0 opacity-0 mr-0 overflow-hidden"
          }`}
        >
          <button
            onClick={() => router.back()}
            className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gula-jawa active:scale-90 transition-transform border border-terakota/5"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-terakota" />
          </div>
          <input
            type="text"
            value={inputValue}
            onFocus={handleFocus}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Cari nama menu..."
            className="w-full bg-white border border-terakota/10 rounded-2xl py-3 text-sm text-gula-jawa focus:outline-none focus:ring-2 focus:ring-kunyit/20 focus:border-kunyit transition-all pl-11 pr-4"
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-2">
            {isPending ? (
              <div className="w-4 h-4 border-2 border-kunyit border-t-transparent rounded-full animate-spin" />
            ) : (
              inputValue.length > 0 && (
                <button
                  onClick={() => setInputValue("")}
                  className="text-terakota/50 hover:text-terakota transition-colors"
                  type="button"
                >
                  <X size={18} />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
