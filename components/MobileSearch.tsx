// components/MobileSearch.tsx
"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const MobileSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleFocus = () => {
    if (pathname !== "/menu") {
      const url = inputValue ? `/menu?search=${inputValue}` : "/menu";
      router.push(url);
    }
  };

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

  return (
    <div className="md:hidden sticky top-0 z-40 bg-santan/95 backdrop-blur-md px-6 py-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isPending ? (
            // Spinner kecil saat loading
            <div className="w-4 h-4 border-2 border-kunyit border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search size={18} className="text-terakota" />
          )}
        </div>
        <input
          type="text"
          value={inputValue}
          onFocus={handleFocus}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Cari nama menu..."
          className="w-full bg-white border border-terakota/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-gula-jawa focus:outline-none focus:ring-2 focus:ring-kunyit/20 focus:border-kunyit transition-all"
        />
      </div>
    </div>
  );
};

export default MobileSearch;
