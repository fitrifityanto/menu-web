"use client"; // Wajib karena error boundary harus client-side

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke console agar kamu tetap bisa meninjau masalahnya
    console.error("Detail Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-20 h-20 bg-terakota/10 flex items-center justify-center rounded-full text-terakota mb-6">
        <AlertCircle size={48} />
      </div>

      <h2 className="font-serif text-3xl text-gula-jawa mb-2">
        Aduh, Ada Kendala Teknis
      </h2>

      <p className="text-terakota mb-8 max-w-md font-light">
        Kami kesulitan mengambil data menu saat ini. Pastikan koneksi aman atau
        coba segarkan halaman.
      </p>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-gula-jawa text-santan px-8 py-3 rounded-full font-medium hover:bg-terakota transition-all shadow-md active:scale-95"
      >
        <RefreshCcw size={18} />
        Coba Lagi
      </button>
    </div>
  );
}
