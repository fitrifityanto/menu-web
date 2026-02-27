import { MenuItem, ApiResponse } from "@/types/menu";
import MenuCard from "@/components/MenuCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getAllMenus(query?: string): Promise<MenuItem[]> {
  const url = query
    ? `${API_URL}/api/menus?category_id=2&name=${query}`
    : `${API_URL}/api/menus?category_id=2`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-API-KEY": process.env.NEXT_SERVER_API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil data menu");

  const response: ApiResponse = await res.json();
  return response.data;
}

// Perhatikan perubahan pada tipe data dan penggunaan await di bawah ini
export default async function MenuPage(props: {
  searchParams: Promise<{ search?: string }>; // Ubah jadi Promise
}) {
  // Tunggu (await) searchParams sebelum digunakan
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";

  const allMenus = await getAllMenus(searchTerm);

  return (
    <main className="bg-santan min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="font-serif text-5xl text-gula-jawa mb-4">
            {searchTerm
              ? `Hasil pencarian: "${searchTerm}"`
              : "Daftar Menu Lengkap"}
          </h1>
          <p className="text-terakota font-light">
            Sajian tradisi dari dapur kami untuk meja Anda.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allMenus.length > 0 ? (
            allMenus.map((item) => <MenuCard key={item.ID} item={item} />)
          ) : (
            <p className="col-span-full text-center text-terakota">
              Menu tidak ditemukan untuk "{searchTerm}"
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
